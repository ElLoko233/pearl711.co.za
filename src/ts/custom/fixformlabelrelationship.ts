const fixingFormLabel = () => {
    // fixing the form and label relationship such that when the label is clicked the inout it belongs to is in focus

    // get all labels
    const labels = document.querySelectorAll('label');

    // add a click event such that they focus the input element that they belong to
    labels.forEach( label => {
        label.addEventListener('click', () => {
            // get the input element that the label belongs to
            const input : HTMLInputElement = document.querySelector(`#${label.getAttribute('for')}`) as HTMLInputElement;

            // focus the input element
            input.focus();
        });
    });
}

export {fixingFormLabel};