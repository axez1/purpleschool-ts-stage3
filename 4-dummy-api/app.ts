interface MethodToFetch {
  GET: string;
  POST?: string;
}

interface RouteToFetch {
  GET_USERS: string;
  SEND_DATA?: string;
}

interface responseBlockItem {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image?: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  eyeColor?: string;
  hair?: object;
  ip: string;
  address: object;
  macAddress: string;
  university: string;
  bank?: object;
  company?: object;
  ein?: string;
  ssn?: string;
  userAgent: string;
  crypto?: object;
  role: string;
}

const BASE_API_URL: string = 'https://dummyjson.com';

const fetchMethod: MethodToFetch = {
  GET: 'GET',
  POST: 'POST'
};

const routeMethod: RouteToFetch = {
  GET_USERS: '/users',
  SEND_DATA: '/',
};

const renderDataItems = (data: { users: responseBlockItem[] }) => {
  const usersList = data.users;
  usersList.forEach(user => {
    console.log(user.firstName);
  });
}

const loadData = async (route: string, method: string = fetchMethod.GET, body = null) =>
  await fetch(`${BASE_API_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Произошла ошибка ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((err) => {
      throw new Error(err.message);
    });

const getUserData = () => loadData(routeMethod.GET_USERS);

getUserData()
  .then((data: { users: responseBlockItem[] }) => {
    renderDataItems(data);
  })
  .catch(
    (error) => {
      console.error(error);
    }
  );