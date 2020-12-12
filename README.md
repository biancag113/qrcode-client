Steps to creating this app:

1) npx create-react-app qrcode-client
2) cd qrcode-client
3) npm install -g @aws-amplify/cli
4) amplify configure
5) amplify init
6) amplify add auth
7) npm install --save aws-amplify @aws-amplify/ui-react
8) code App.js <AmplifySignOut />, imports of AWS and amplify
9) amplify push
10) amplify hosting add
11) amplify publish
