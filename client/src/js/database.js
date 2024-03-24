import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {


  const callDb = await openDB('jate', 1);

  const text = callDb.transaction('jate', 'readwrite');

  const storeText = text.objectStore('jate');

  const requestText = storeText.put({value: content, id: 1});

  const result = await requestText;
  console.log('Saved to database', result);
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  const callDb = await openDB('jate', 1);

  const text = callDb.transaction('jate', 'readwrite');

  const storeText = text.objectStore('jate');

  const requestText = storeText.get(1);

  const result = await requestText;
  console.log('result.value', result.value);
  return result?.value;
}


initdb();
