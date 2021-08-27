import { createServer, Model } from 'miragejs';
import { v4 as uuid } from 'uuid';

const loadStorage = (storageName) => JSON.parse(localStorage.getItem(storageName));
const saveStorage = (storageName, payload) => localStorage.setItem(storageName, JSON.stringify(payload));

export function makeServer({ environment = 'development' } = {}) {

    const server = createServer({
        environment,
        models: {
            contacts: Model,
            methods: Model,
            drafts: Model
        },

        seeds(server) {
            const localSavedContacts = loadStorage('contacts');
            const localSavedMethods = loadStorage('methods');
            const localSavedDrafts = loadStorage('drafts');

            if (localSavedContacts?.length) {
                localSavedContacts.forEach(contact => {
                    server.create('contact', contact);
                });
            } else {
                const seedContacts = [
                    {
                        id: uuid(),
                        firstName: 'Alex', 
                        lastName: 'Testov', 
                        email: 'test1@yandex.ru'
                    }, {
                        id: uuid(),
                        firstName: 'Bruce', 
                        lastName: 'Testson', 
                        email: 'test2@gmail.com'
                    }, {
                        id: uuid(),
                        firstName: 'Carmen', 
                        lastName: 'Testil', 
                        email: 'test3@mail.com'
                    }
                ];
                seedContacts.forEach(contact => server.create('contact', contact));
                saveStorage('contacts', seedContacts);
            }

            if (localSavedMethods?.length) {
                localSavedMethods.forEach(method => {
                    server.create('method', method);
                });
            } else {
                const seedMethods = [
                    {
                        id: uuid(),
                        type: 'card',
                        name: 'Think off',
                        number: '1234-2222-9874-2021',
                        expiryDate: '06/18'
                    }, {
                        id: uuid(),
                        type: 'card',
                        name: 'Omega',
                        number: '1234-2222-9874-0322',
                        expiryDate: '04/20'
                    }, {
                        id: uuid(),
                        type: 'account',
                        name: 'Mother\'s nice bank account',
                        number: '1234567890',
                        bsb: '420-069'
                    }
                ];
                seedMethods.forEach(contact => server.create('method', contact));
                saveStorage('methods', seedMethods);
            }

            if (localSavedDrafts?.length) {
                localSavedDrafts.forEach(draft => {
                    server.create('draft', draft);
                });
            }
        },

        routes() {
            this.namespace = 'api';

            /* contacts */
            this.get('/contacts', ({ contacts }) => {
                return contacts.all();
            });

            this.post('/contacts/new', ({ contacts }, request ) => {
                const contact = JSON.parse(request.requestBody);
                contacts.create(contact);
                const payload = contacts.all().models.map(({ attrs }) => attrs);
                saveStorage('contacts', payload);
                return contact;
            });

            this.del('/contacts/:id', ({ contacts }, request ) => {
                const id = request.params.id;
                const contact = contacts.find(id);
                contact.destroy();
                const payload = contacts.all().models.map(({ attrs }) => attrs);
                saveStorage('contacts', payload);
            });

            /* methods */
            this.get('/methods', ({ methods }) => {
                return methods.all();
            });

            this.post('/methods/new', ({ methods }, request ) => {
                const method = JSON.parse(request.requestBody);
                methods.create(method);
                const payload = methods.all().models.map(({ attrs }) => attrs);
                saveStorage('methods', payload);
                return method;
            });

            this.del('/methods/:id', ({ methods }, request ) => {
                const id = request.params.id;
                const method = methods.find(id);
                method.destroy();
                const payload = methods.all().models.map(({ attrs }) => attrs);
                saveStorage('methods', payload);
            });
        }
    });
    return server;
}
