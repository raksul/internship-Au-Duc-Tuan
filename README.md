## Internship Project

- Intern: [Au Duc Tuan](https://github.com/ibenrique2510)
- Mentor: [Danh Luong](https://github.com/azltdanh)
- Project: Smartphones-shop

## Raw UI Designs

- On web: https://www.figma.com/file/pzoNRTQR6uNtwYtmLfoiaX/web
- On mobile: https://www.figma.com/file/qmX8siclnNqxAcFuY12ghQ/mobile?node-id=23%3A0
- Check the comment tab for detailed comments

## Database Design

- ERD design
 <img src="/Database/first-design/ERD.png">

- However, the project will use the simplified version of database desgin and supported by variants.json file (which can be found with details in 'Database/third-design')
 <img src="/Database/third-design/ERD.png">

## Installations

```bash
npm install -g json-server
cd smartphones-shop
# install dependencies
$ npm install

# serve with hot reload at localhost:3001
$ json-server --watch db.json
$ PORT=3001 npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
