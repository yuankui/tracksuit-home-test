export const createTable = `
  CREATE TABLE if not exists insights (
    id INTEGER PRIMARY KEY ASC NOT NULL,
    brandId INTEGER NOT NULL,
    createdAt TEXT NOT NULL,
    text TEXT NOT NULL
  )
`;

export type Row = {
  id: number;
  brandId: number;
  createdAt: number;
  text: string;
};

export type Insert = {
  brandId: number;
  createdAt: string;
  text: string;
};

export const insertStatement = (item: Insert) =>
  `INSERT INTO insights (brandId, createdAt, text) VALUES (${item.brandId}, '${item.createdAt}', '${item.text}')`;

export const deleteStatement = (id: number) =>
  `DELETE FROM insights WHERE id = ${id}`;
