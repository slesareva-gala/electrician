import placeArrowUp from './modules/placeArrowUp'
import navigateDocument from './modules/navigateDocument'
import accordeon from './modules/accordeon';
import sliders from './modules/sliders';
import form from './modules/form';
import sendForm from './modules/sendForm';

navigateDocument(767)
placeArrowUp()
accordeon()
sliders()
form()
sendForm({
    url: 'https://jsonplaceholder.typicode.com/posts',
    formsName: ['form-callback']
})
