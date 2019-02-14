import nextRoutes from '@yolkai/next-routes';

export default nextRoutes()
  .add('owners/edit', '/owners/:ownerId/edit')
  .add('owners/pets/edit', '/owners/:ownerId/pets/:petId/edit')
  .add('owners/pets/new', '/owners/:ownerId/pets/new')
  .add('owners/pets/visits/new', '/owners/:ownerId/pets/:petId/visits/new')
  .add('owners', '/owners/:ownerId');
