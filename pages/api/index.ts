import { Get } from 'guards'
import with_interceptors from 'interceptors'
import { tApiHandler, tApiRequest, tApiResponse } from 'interface'
import with_middlewares from 'middlewares'
import { sLog } from 'schema'

type Data = {
  name: string
}

let handler: tApiHandler<any> = async (
  req: tApiRequest,
  res: tApiResponse<Data>
) => {
  const log_repo = req.database.getRepository(sLog);
  await log_repo.insert({ message: `${req.method} ${req.url}` })
  res.status(200).json({ name: 'John Doe' })
}

handler = with_interceptors(handler);
handler = with_middlewares(handler);
handler = Get(handler)

export default handler;



