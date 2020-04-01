const now = new Date().getTime();

const members = [];
const getPassword = (user) => {
  switch (user) {
    case 'admin':
      return 'admin';
      break;
    case 'man':
      return 'man';
      break;
    case 'woman':
      return 'woman';
      break;
    case 'visitor':
      return 'visitor';
      break;
    default:
      break;
  }
};
const users = [
  {
    'username': 'admin',
    'password': getPassword('admin')
  },
  {
    'username': 'man',
    'password': getPassword('man')
  },
  {
    'username': 'woman',
    'password': getPassword('woman')
  },
  {
    'username': 'visitor',
    'password': getPassword('visitor')
  },
];
for (let i = 0; i < 20; i++) {
  members.push({
    'name': 'user' + i,
    'age': (Math.random() * (30 - 20) + 20).toFixed(0),
    'gender': Math.random() > 0.5 ? 'Female' : 'Male',
    'address': '广州市天河区元岗横路' + (Math.random() * (20 - 10) + 10).toFixed(0) + '号',
    'checked': false
  });
}

export default {
  'GET members': (req) => {
      if (req.queryString.currentModule === 'members') {
        return members;
      } else {
        console.log('get请求来了');
        let currentGender: string;
        req.queryString.currentModule === 'man' ? currentGender = 'Male' : currentGender = 'Female';
        return members.filter((data) => data.gender === currentGender);
      }
  },
  'POST login': (req) => {
    console.log('post请求来了');
    const isVerified = users.some((item) => {
      return item.username === req.body.username && item.password === req.body.password;
    });
    return isVerified;
    // return new Object({
    //   'msg': 200,
    //   'isLogined': isVerified
    // });
    // if(users.some((req.username) => {})){}
  }
};
