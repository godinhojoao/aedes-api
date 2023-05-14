import { JwtAdapterImp } from './../../src/infra/adapters/jwt/JwtAdapter';

const jwtAdapter = new JwtAdapterImp();
const tokenPayload = {
  id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00541',
  name: 'John Doe',
  email: 'john@example.com',
  role: 0,
};

export const jwtToken = `Bearer ${jwtAdapter.generateToken(tokenPayload)}`;
