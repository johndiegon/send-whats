const createElementByStringHtml = (stringHtml: string): Element => {
    const div = document.createElement('div');
    div.innerHTML = stringHtml;
    return div.firstElementChild;
}

export const HtmlHelper = {
    createElementByStringHtml
}