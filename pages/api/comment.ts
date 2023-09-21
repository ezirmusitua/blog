import { Get } from "guards";
import * as https from "https";
import withInterceptors from "interceptors";
import { tApiHandler, tApiRequest, tApiResponse } from "interface";
import withMiddleware from "middleware";

type tData = { enabled: boolean };

function get<T>(url: string, headers = {}): Promise<T> {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers }, (resp) => {
      let data = "";
      resp.on("data", (chunk) => (data += chunk));
      resp.on("end", () => resolve(JSON.parse(data) as T));
      resp;
    });
    req.on("error", (err) => {
      console.log("[ERROR] ", err.message);
      reject(err);
    });
  });
}

interface iIpLocationReturn {
  ip: string;
  ip_number: string;
  ip_version: 4 | 6;
  country_name: string;
  country_code2: string;
  isp: string;
  response_code: string;
  response_message: string;
}

function getIpLocation(ip: string) {
  const url = `https://api.iplocation.net/?cmd=ip-country&ip=${ip}`;
  return get<iIpLocationReturn>(url);
}

function getRemoteIp(req: tApiRequest) {
  let ip: string = "";
  if (req.headers["x-forwarded-for"]) {
    ip = (req.headers["x-forwarded-for"] || "") as string;
  } else if (req.socket.remoteAddress) {
    ip = req.socket.remoteAddress || "";
  } else {
    ip = "";
  }
  return (ip.split(",").pop() || "").trim();
}

let handler: tApiHandler<any> = async (
  req: tApiRequest,
  res: tApiResponse<tData>
) => {
  res.status(200);
  const ip = getRemoteIp(req);
  if (!ip) {
    res.json({ enabled: false });
    return;
  }
  const location = await getIpLocation(ip);
  res.json({ enabled: location.country_code2 != "CN" });
};

handler = withInterceptors(handler);
handler = withMiddleware(handler);
handler = Get(handler);

export default handler;
