import React, {Component} from 'react';

class Transliterator extends Component{
   constructor(props){
      super(props);
      this.state = {value: ''};

      this.handleChange = this.handleChange.bind(this);
   }

   handleChange(event) {
      let input = event.target.value;
      let result = '';
      const lettersRus = ['Я','я','Ю','ю','Ч','ч','Ш','ш','Щ','щ','Ж','ж','А','а','Б','б','В','в','Г','г','Д','д','Е','е','Ё','ё','З','з','И','и','Й','й','К','к','Л','л','М','м','Н','н', 'О','о','П','п','Р','р','С','с','Т','т','У','у','Ф','ф','Х','х','Ц','ц','Ы','ы','Ь','ь','Ъ','ъ','Э','э'];
      const lettersEng = ['Ya','ya','Yu','yu','Ch','ch','Sh','sh','Sh','sh','Zh','zh','A','a','B','b','V','v','G','g','D','d','E','e','E','e','Z','z','I','i','J','j','K','k','L','l','M','m','N','n', 'O','o','P','p','R','r','S','s','T','t','U','u','F','f','H','h','C','c','Y','y','`','`','\'','\'','E', 'e'];

      for (let i = 0; i < input.length; i++){
         const letterPos = lettersRus.indexOf(input[i]);

         if (letterPos > -1) {
            result += lettersEng[letterPos];
         } else {
            result += input[i];
         }
      }

      this.setState({value: result});
   }

   render() {
      return (
         <form className={'transliterator'}>
            <label>
               <p>Транслитератор</p>
               <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
         </form>
      )
   }
}

export default Transliterator;