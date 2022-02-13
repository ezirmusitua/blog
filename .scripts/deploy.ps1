node ./scripts/bundle.js

ssh $REMOTE -t "mkdir /src"

scp app.zip $DEPLOY_TARGET:/src

ssh -t $DEPLOY_TARGET < .scripts/update_app.sh

rm -R -Force app
rm app.zip