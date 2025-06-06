import { type Result, getConnection, SYSDBA } from 'oracledb';
const dbConfig = {
    user: "SYS",
    password: "oracle",
    connectString: "0.0.0.0:1521/FREEPDB1",
    privilege: SYSDBA
};

console.log('making db connection')
const connection = await getConnection(dbConfig);
console.log('made db connection')

console.log('dropping products table if exists')
await connection.execute(`drop table if exists products`);
console.log('dropped table if exists')


console.log('cretaing products table')
let sql = `CREATE TABLE products (id              VARCHAR2(400) PRIMARY KEY,
            name     VARCHAR2(4000),
            category  VARCHAR2(100) NOT NULL,
            price          NUMBER NOT NULL,
            product_attributes JSON
        )`
await connection.execute(sql);
console.log('created products table')

interface laptopAttributes  {
    brand: string,
    yearOfManufacturing: Date,
    CountryOfOrigin: string,
    RAM: number,
    RAMUNit: string,
    HDD: number,
    HDDUnit: string,
}
const laptop1: laptopAttributes = {
    brand: "abc",
    yearOfManufacturing: new Date(),
    CountryOfOrigin: "ZZ",
    RAM: 40,
    RAMUNit: "GB",
    HDD: 10,
    HDDUnit: "TB"
}
const laptop2: laptopAttributes = {
    brand: "def",
    yearOfManufacturing: new Date(),
    CountryOfOrigin: "XX",
    RAM: 30,
    RAMUNit: "GB",
    HDD: 5,
    HDDUnit: "TB"
}

console.log('inserting data to table')
sql = `INSERT INTO products
        VALUES (SYS_GUID(),
                'xyz-laptop',
                'electronics',
                3.54,
                '${JSON.stringify(laptop1)}')`
await connection.execute(sql);

sql = `INSERT INTO products
        VALUES (SYS_GUID(),
                'def-laptop',
                'electronics',
                1.54,
                '${JSON.stringify(laptop2)}')`
await connection.execute(sql);
console.log('inserted data to table')

console.log('querying data from table')
let allLaptops : Result<laptopAttributes> = await connection.execute<laptopAttributes>('select product_attributes from products')
allLaptops.rows?.forEach((laptopArray: any) => {
    let laptop : laptopAttributes = laptopArray[0]
    console.log(`${laptop.brand} laptop with ${laptop.RAM}${laptop.RAMUNit} RAM, ${laptop.HDD}${laptop.HDDUnit} storage, manufactured in ${laptop.CountryOfOrigin} on ${laptop.yearOfManufacturing}`)
})

process.exit()

