import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  //ssl: true,
});

export default {
  connect(query, params) {
    return new Promise((resolve, reject) => {
      pool.query(query, params)
        .then(res => resolve(res.rows))
        .catch(err => reject(err));
    });
  },
};
