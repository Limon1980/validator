'use strict';

class Validator{
  constructor({selector, pattern, method}){
    this.form = document.querySelector(selector);
    this.pattern = pattern;
    this.method = method;
    this.elementsForm = [...this.form.elements].filter( item => {
      return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
     });
  }

  init(){
    this.applyStele();
    this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt));
    
  }

  checkIt(){
    console.log(event);
  }

  showError(elem){
    elem.classList.remove('success'); 
    elem.classList.add('error');
    const erroeDiv = document.createElement('div');
    erroeDiv.textContent = 'Ошибка в этом поле';
    erroeDiv.classList.add('validator-error');
    elem.insertAdjacentElement('afterend', erroeDiv);
  }
  
  showSuccess(elem){
    elem.classList.remove('error');
  elem.classList.add('success'); 
    if (elem.nextElementSibling.classList.contais('validator-error')){
      elem.nextElementSibling.remove();
    }  
  }

  applyStele(){
    const style = document.createElement('style');
    style.textContent = `
    input.success {
      border: 2px solid green
    }
    iput.error {
      border: 2px solid red
    }
    validator-error {
      font-size: 14px;
      color: red
    }
    `;
    document.head.appendChild(style);
  }
}