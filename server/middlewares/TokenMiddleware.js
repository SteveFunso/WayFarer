/* eslint-disable max-len */
import jwt from 'jsonwebtoken';
import APIError from '../model/errors';
import Response from '../model/Response';
import UserServices from '../services/UserServices';

export default class TokenMiddleWare {
  // eslint-disable-next-line camelcase
  static generateToken(email_address, id) {
    const token = jwt.sign({ email: email_address, userId: id }, process.env.JWT_KEY, { expiresIn: '1h' });
    return token;
  }

  // static async validateToken(req, res, next) {
  //   let bearerHeader = req.headers.token;
  //   try {
  //     if (typeof bearerHeader === 'undefined') {
  //       throw new APIError(400, 'Please provide a valid token');
  //     }

  //     if (bearerHeader.startsWith('Bearer ')) {
  //       bearerHeader = bearerHeader.slice(7, bearerHeader.length);
  //     }
  //     jwt.verify(bearerHeader, process.env.JWT_KEY, (err, decoded) => {
  //       try {
  //         if (err) {
  //           throw new APIError(400, 'Invalid token');
  //         }
  //         console.log('ThIS IS DECOOED ', decoded);
  //         const verifiedUser = decoded;
  //         req.body.verifiedUser = verifiedUser;
  //         next();
  //       } catch (error) {
  //         res.status(error.statusCode || 500).json(new Response(false, error.statusCode || 500, error.message));
  //       }
  //     });
  //   } catch (error) {
  //     res.status(error.statusCode || 500).json(
  //       new Response(false, error.statusCode || 500, error.message),
  //     );
  //   }
  // }


  // static async validateToken(req, res, next) {
  //   let bearerHeader = req.headers.token;
  //   try {
  //     if (typeof bearerHeader === 'undefined') {
  //       throw new APIError(400, 'Please provide a valid token');
  //     }

  //     if (bearerHeader.startsWith('Bearer ')) {
  //       bearerHeader = bearerHeader.slice(7, bearerHeader.length);
  //     }
  //     jwt.verify(bearerHeader, process.env.JWT_KEY, (err, decoded) => {
  //       try {
  //         if (err) {
  //           throw new APIError(400, 'Invalid token');
  //         }
  //         const verifiedUser = UserServices.findUserByEmail(decoded.email);
  //         req.body.verifiedUser = verifiedUser;
  //         next();
  //       } catch (error) {
  //         res.status(error.statusCode || 500).json(new Response(false, error.statusCode || 500, error.message));
  //       }
  //     });
  //   } catch (error) {
  //     res.status(error.statusCode || 500).json(
  //       new Response(false, error.statusCode || 500, error.message),
  //     );
  //   }
  // }

  // static async validateToken(req, res, next) {
  //   let bearerHeader = req.headers.token;
  //   try {
  //     if (typeof bearerHeader === 'undefined') {
  //       throw new APIError(400, 'Please provide a valid token');
  //     }

  //     if (bearerHeader.startsWith('Bearer ')) {
  //       bearerHeader = bearerHeader.slice(7, bearerHeader.length);
  //     }
  //     jwt.verify(bearerHeader, process.env.JWT_KEY, (err, decoded) => {
  //       try {
  //         if (err) {
  //           throw new APIError(400, 'Invalid token');
  //         }
  //         const verifiedUser = UserServices.findUserByEmail(decoded.email);
  //         // eslint-disable-next-line prefer-destructuring
  //         req.body.verifiedUser = verifiedUser[0];
  //         console.log(req.body.verifiedUser);
  //         next();
  //       } catch (error) {
  //         res.status(error.statusCode || 500).json(new Response(false, error.statusCode || 500, error.message));
  //       }
  //     });
  //   } catch (error) {
  //     res.status(error.statusCode || 500).json(
  //       new Response(false, error.statusCode || 500, error.message),
  //     );
  //   }
  // }


  static async validateToken(req, res, next) {
    let bearerHeader = req.headers.token;
    try {
      if (typeof bearerHeader === 'undefined') {
        throw new APIError(400, 'Please provide a valid token');
      }

      if (bearerHeader.startsWith('Bearer ')) {
        bearerHeader = bearerHeader.slice(7, bearerHeader.length);
      }
      jwt.verify(bearerHeader, process.env.JWT_KEY, async (err, decoded) => {
        try {
          if (err) {
            throw new APIError(400, 'Invalid token');
          }
          const verifiedUser = await UserServices.findUserByEmail(decoded.email);
          // eslint-disable-next-line prefer-destructuring
          req.body.verifiedUser = verifiedUser[0];
          next();
        } catch (error) {
          res.status(error.statusCode || 500).json(new Response(false, error.statusCode || 500, error.message));
        }
      });
    } catch (error) {
      res.status(error.statusCode || 500).json(
        new Response(false, error.statusCode || 500, error.message),
      );
    }
  }
}
