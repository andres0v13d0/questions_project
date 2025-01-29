import { User } from './modules/users/user.entity/user.entity'
import { File } from 'multer'; // Importa Multer.File

declare global {
  namespace Express {
    interface Request {
      user?: User; 
      file?: File; 
      files?: File[]; 
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: User; 
    }
  }
}
