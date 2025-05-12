import { format, parseISO } from 'date-fns';

import "./css/styles.css";

document.addEventListener("DOMContentLoaded", function() {
    /* Putting the event listener in the modal side items */
    const allModalSidebarOptions = document.querySelectorAll(' .create-new-options > *');

    for (option in allModalSidebarOptions) {
        option.addEventListener('click', () => {
            
        });
    }
})