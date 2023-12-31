import mysql from 'mysql2/promise';
import { DB_DATABASE, DB_HOST, DB_PASS, DB_USER } from './env.js';
import { hash } from './lib/hash.js';

const DATABASE_RESET = false;

async function setupDb() {
    // Susikuriame DB, jei nera
    let connection = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASS,
    });

    if (DATABASE_RESET) {
        await connection.execute(`DROP DATABASE IF EXISTS \`${DB_DATABASE}\``);
    }
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\``);
    connection.query(`USE \`${DB_DATABASE}\``);

    if (DATABASE_RESET) {
        // Susikuriame lenteles
        await rolesTable(connection);
        await usersTable(connection);
        await tokensTable(connection);
        await blockTable(connection);
        await fundsTable(connection);
        await donationTable(connection);
        // await carTypesTable(connection);
        // await steeringWheelTable(connection);
        // await carsTable(connection);

        // Uzpildome informacija
        await generateRoles(connection);
        await generateUsers(connection);
        await generateBlock(connection);
        await generateFunds(connection);
        
        
        // await generateCarTypes(connection);
        // await generateSteeringWheel(connection);
    }

    return connection;
}

async function usersTable(db) {
    try {
        const sql = `CREATE TABLE users (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        username varchar(30) NOT NULL,
                        email varchar(40) NOT NULL,
                        password_hash varchar(128) NOT NULL,
                        role_id int(10) NOT NULL DEFAULT 2,
                        is_blocked int(1) NOT NULL DEFAULT 0,
                        created timestamp NOT NULL DEFAULT current_timestamp(),
                        PRIMARY KEY (id),
                        KEY role_id (role_id),
                        CONSTRAINT users_ibfk_1 FOREIGN KEY (role_id) REFERENCES roles (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sukurti "users" lenteles');
        console.log(error);
        throw error;
    }
}

async function tokensTable(db) {
    try {
        const sql = `CREATE TABLE tokens (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        user_id int(10) NOT NULL,
                        token varchar(36) NOT NULL,
                        created timestamp NOT NULL DEFAULT current_timestamp(),
                        PRIMARY KEY (id),
                        KEY user_id (user_id),
                        CONSTRAINT tokens_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sukurti "tokens" lenteles');
        console.log(error);
        throw error;
    }
}

async function rolesTable(db) {
    try {
        const sql = `CREATE TABLE roles (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        role varchar(10) NOT NULL,
                        PRIMARY KEY (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sukurti "roles" lenteles');
        console.log(error);
        throw error;
    }
}

async function blockTable(db) {
    try {
        const sql = `CREATE TABLE block (
            id int(2) NOT NULL AUTO_INCREMENT,
            status varchar(10) NOT NULL,
            PRIMARY KEY (id)
          ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sukurti "roles" lenteles');
        console.log(error);
        throw error;
    }
}

async function fundsTable(db) {
    try {
        const sql = `CREATE TABLE funds (
            id int(10) NOT NULL AUTO_INCREMENT,
            user_id int(10) NOT NULL,
            title varchar(200) NOT NULL,
            fundText varchar(500) NOT NULL,
            fundSum int(10) NOT NULL,
            is_blocked_fund int(2) NOT NULL DEFAULT 1,
            image varchar(100) NOT NULL,
            PRIMARY KEY (id),
            KEY user_id (user_id),
            KEY is_blocked_fund (is_blocked_fund),
            CONSTRAINT funds_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id),
            CONSTRAINT funds_ibfk_2 FOREIGN KEY (is_blocked_fund) REFERENCES block (id)
          ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sukurti "roles" lenteles');
        console.log(error);
        throw error;
    }
}

async function donationTable(db) {
    try {
        const sql = `CREATE TABLE donation (
            id int(10) NOT NULL AUTO_INCREMENT,
            fundId int(10) NOT NULL,
            name varchar(50) NOT NULL,
            donation int(10) NOT NULL,
            created timestamp NOT NULL DEFAULT current_timestamp(),
            PRIMARY KEY (id),
            KEY fundId (fundId),
            CONSTRAINT donation_ibfk_1 FOREIGN KEY (fundId) REFERENCES funds (id)
          ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sukurti "donation" lenteles');
        console.log(error);
        throw error;
    }
}

// async function carTypesTable(db) {
//     try {
//         const sql = `CREATE TABLE \`car-types\` (
//                         id int(10) NOT NULL AUTO_INCREMENT,
//                         title varchar(20) NOT NULL,
//                         PRIMARY KEY (id)
//                     ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4`;
//         await db.execute(sql);
//     } catch (error) {
//         console.log('Nepavyko sukurti "roles" lenteles');
//         console.log(error);
//         throw error;
//     }
// }

// async function steeringWheelTable(db) {
//     try {
//         const sql = `CREATE TABLE \`steering-wheel\` (
//                         id int(1) NOT NULL AUTO_INCREMENT,
//                         side varchar(10) NOT NULL,
//                         PRIMARY KEY (id)
//                     ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4`;
//         await db.execute(sql);
//     } catch (error) {
//         console.log('Nepavyko sukurti "steering-wheel" lenteles');
//         console.log(error);
//         throw error;
//     }
// }

// async function carsTable(db) {
//     try {
//         const sql = `CREATE TABLE cars (
//                         id int(10) NOT NULL AUTO_INCREMENT,
//                         user_id int(10) NOT NULL,
//                         car_type_id int(10) NOT NULL,
//                         title varchar(200) NOT NULL,
//                         color varchar(50) NOT NULL,
//                         price int(6) unsigned NOT NULL DEFAULT 0,
//                         year int(4) unsigned NOT NULL,
//                         steering_wheel_id int(1) NOT NULL DEFAULT 0,
//                         location varchar(50) NOT NULL,
//                         mileage int(10) unsigned NOT NULL DEFAULT 0,
//                         image varchar(100) NOT NULL,
//                         created timestamp NOT NULL DEFAULT current_timestamp(),
//                         PRIMARY KEY (id),
//                         KEY user_id (user_id),
//                         KEY car_type_id (car_type_id),
//                         KEY steering_wheel_id (steering_wheel_id),
//                         CONSTRAINT cars_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id),
//                         CONSTRAINT cars_ibfk_2 FOREIGN KEY (steering_wheel_id) REFERENCES \`steering-wheel\` (id),
//                         CONSTRAINT cars_ibfk_3 FOREIGN KEY (car_type_id) REFERENCES \`car-types\` (id)
//                     ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4`;
//         await db.execute(sql);
//     } catch (error) {
//         console.log('Nepavyko sukurti "cars" lenteles');
//         console.log(error);
//         throw error;
//     }
// }

async function generateRoles(db) {
    try {
        const sql = `INSERT INTO roles (role) VALUES ('admin'), ('user'), ('buyer');`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sugeneruoti "roles" lenteles turinio');
        console.log(error);
        throw error;
    }
}

async function generateUsers(db) {
    try {
        const sql = `INSERT INTO users (username, email, password_hash, role_id) 
                    VALUES ('Mantas', 'mantas@mantas.com', '${hash('mantas@mantas.com')}', 1),
                        ('Jonas Jonaitis', 'jonas@jonas.lt', '${hash('jonas@jonas.lt')}', 2),
                        ('Ona Onaityte', 'ona@ona.lt', '${hash('ona@ona.lt')}', 2);`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sugeneruoti "roles" lenteles turinio');
        console.log(error);
        throw error;
    }
}

async function generateBlock(db) {
    try {
        const sql = `INSERT INTO block ( status)
                    VALUES ('Pending'),
                        ('Active'),
                        ('Bloked');`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sugeneruoti "roles" lenteles turinio');
        console.log(error);
        throw error;
    }
}

async function generateFunds(db) {
    try {
        const sql = `INSERT INTO funds (user_id, title, fundText, fundSum, is_blocked_fund, image)
                    VALUES ('2', 'Kaciukas Nerangutis', 'Kaciukui reikia operacijos istraukti galva is batono', '500', '2', 'http://localhost:3001/images/fund/breading-cats-q013.jpg'),
                    ('2', 'Kaciukas Pilkutis', 'Mielas kaciukas, seimininkas nori nusipirkti suni', '1000', '2', 'http://localhost:3001/images/fund/Adorable-animal-cat-20787.jpg'),
                    ('3', 'Suo Karstytojas', 'Paaukokite suniukui!', '200', '2', 'http://localhost:3001/images/fund/975504278_bef1c08be4_b.jpg'),
                    ('3', 'Keistas suo', 'Suniui reikia naujos lovos', '400', '2', 'http://localhost:3001/images/fund/images.jpg');`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sugeneruoti "roles" lenteles turinio');
        console.log(error);
        throw error;
    }
}


// async function generateCarTypes(db) {
//     const carTypes = ['SUV', 'Sedan', 'Hatchback'];
//     try {
//         const sql = `INSERT INTO \`car-types\` (title) 
//                     VALUES ${carTypes.map(s => `("${s}")`).join(', ')};`;
//         await db.execute(sql);
//     } catch (error) {
//         console.log('Nepavyko sugeneruoti "roles" lenteles turinio');
//         console.log(error);
//         throw error;
//     }
// }

// async function generateSteeringWheel(db) {
//     const steeringWheelSides = ['left', 'right', 'center', 'none', 'both'];
//     try {
//         const sql = `INSERT INTO \`steering-wheel\` (side) 
//                     VALUES ${steeringWheelSides.map(s => `("${s}")`).join(', ')};`;
//         await db.execute(sql);
//     } catch (error) {
//         console.log('Nepavyko sugeneruoti "streering-wheel" lenteles turinio');
//         console.log(error);
//         throw error;
//     }
// }

export const connection = await setupDb();