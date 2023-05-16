import { JwtAdapterImp } from './../../src/infra/adapters/jwt/JwtAdapter';

const jwtAdapter = new JwtAdapterImp();
const tokenPayload = {
  id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00542',
  name: 'Jane Smith',
  email: 'jane@example.com',
  role: 1,
};

export const userJwtToken = `Bearer ${jwtAdapter.generateToken(tokenPayload)}`;
