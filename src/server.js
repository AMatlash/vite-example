import { createServer, Model } from 'miragejs';
import { v4 as uuid } from 'uuid';

const loadContacts = () => JSON.parse(localStorage.getItem('contacts'));
const saveContacts = (payload) => localStorage.setItem('contacts', JSON.stringify(payload));

export function makeServer({ environment = 'development' } = {}) {

    const server = createServer({
        environment,
        models: {
            contacts: Model
        },

        seeds(server) {
            const localSavedContacts = loadContacts();
            if (localSavedContacts?.length) {
                localSavedContacts.forEach(contact => {
                    server.create('contact', contact);
                });
            } else {
                server.create('contact', {
                    id: uuid(),
                    firstName: 'Alex', 
                    lastName: 'Testov', 
                    email: 'test1@yandex.ru'
                });
                server.create('contact', {
                    id: uuid(),
                    firstName: 'Bruce', 
                    lastName: 'Testson', 
                    email: 'test2@gmail.com'
                });
                server.create('contact', {
                    id: uuid(),
                    firstName: 'Carmen', 
                    lastName: 'Testil', 
                    email: 'test3@mail.com'
                });
            }
        },

        routes() {
            this.namespace = 'api';
            this.get('/contacts', ({ contacts }) => {
                return contacts.all();
            });

            this.post('/contacts/new', ({ contacts }, request ) => {
                const contact = JSON.parse(request.requestBody);
                contacts.create(contact);
                saveContacts(contacts.all().models.map(({ attrs }) => attrs));
                return contact;
            });

            this.del('/contacts/:id', ({ contacts }, request ) => {
                const id = request.params.id;
                let contact = contacts.find(id);
                contact.destroy();
                saveContacts(contacts.all().models.map(({ attrs }) => attrs));
            });
        }
    });
    return server;
}
