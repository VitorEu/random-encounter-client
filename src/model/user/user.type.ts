export interface  User {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  state: string;
  city: string;
  password: string;
}

export interface UserBody {
  user: {
    name: string;
    email: string;
    password: string;
    role: string;
  },
  address: {
    countryId: string;
    provinceId: string;
    cityId: string;
    description: string;
  }
}

export interface LoginBody {
  email: string;
  password: string;
}

