import { createServer, Model } from 'miragejs';
import { v4 as uuid } from 'uuid';

const loadContacts = () => JSON.parse(localStorage.getItem('contacts'));
const saveContacts = (payload) => localStorage.setItem('contacts', JSON.stringify(payload));

const loadMethods = () => JSON.parse(localStorage.getItem('methods'));
const saveMethods = (payload) => localStorage.setItem('methods', JSON.stringify(payload));

export function makeServer({ environment = 'development' } = {}) {

    const server = createServer({
        environment,
        models: {
            contacts: Model,
            methods: Model
        },

        seeds(server) {
            const localSavedContacts = loadContacts();
            const localSavedMethods = loadMethods();

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

            if (localSavedMethods?.length) {
                localSavedMethods.forEach(method => {
                    server.create('method', method);
                });
            } else {
                server.create('method', {
                    id: uuid(),
                    type: 'card',
                    name: 'Think off',
                    number: '1234-2222-9874-2021',
                    expiryDate: '06/18'
                });
                server.create('method', {
                    id: uuid(),
                    type: 'card',
                    name: 'Omega',
                    number: '1234-2222-9874-0322',
                    expiryDate: '04/20'
                });
                
                
                server.create('method', {
                    id: uuid(),
                    type: 'account',
                    name: 'Mother\'s nice bank account',
                    number: '1234567890',
                    bsb: '420-069'
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
                saveContacts(contacts.all().models.map(({ attrs }) => attrs));
                return contact;
            });

            this.del('/contacts/:id', ({ contacts }, request ) => {
                const id = request.params.id;
                let contact = contacts.find(id);
                contact.destroy();
                saveContacts(contacts.all().models.map(({ attrs }) => attrs));
            });

            /* methods */
            this.get('/methods', ({ methods }) => {
                return methods.all();
            });

            this.post('/methods/new', ({ methods }, request ) => {
                const method = JSON.parse(request.requestBody);
                methods.create(method);
                saveMethods(methods.all().models.map(({ attrs }) => attrs));
                return method;
            });

            this.del('/methods/:id', ({ methods }, request ) => {
                const id = request.params.id;
                let method = methods.find(id);
                method.destroy();
                saveMethods(methods.all().models.map(({ attrs }) => attrs));
            });
        }
    });
    return server;
}
