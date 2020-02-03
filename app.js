
const app = new Vue({
  el: '#app',
  data: {
    title: 'To Do App',
    newTodo: '',
    todos: []
  },
  methods: {
    addTodo() {
      this.todos.push({
        title: this.newTodo,
        done: false
      });
      this.newTodo = '';
      updateJson();
      addListeners();
    },
    removeTodo(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos.splice(todoIndex, 1);
      updateJson();
      addListeners();
    },
    allDone() {
      this.todos.forEach(todo => {
        todo.done = true;
    });
    updateJson();
    }
  }
});


updateJs();

function updateJson(){
  var niz = new Array();
  for(var i=0;i<app.todos.length;i++){
    var pom = new Object();
    pom.title = app.todos[i].title;
    pom.done = app.todos[i].done;
    niz.push(pom);
  }
  
  var myJson = JSON.stringify(niz);
  
  window.localStorage.setItem('json', myJson);
  
}

function updateJs(){
  var niz = new Array();
  niz=JSON.parse(window.localStorage.getItem('json'));
  for(var i =0;i<niz.length;i++){
    app.todos.push({
      title: niz[i].title,
      done: niz[i].done
    });
  }

}



  window.addEventListener('load',function(){
    addListeners();    
  })

  var broj=0;

function addListeners(){
    var checkboxes = document.getElementsByClassName('checked');
    for(var i =0;i<checkboxes.length;i++){
      if(checkboxes[i]==null){
        return;
      }
      checkboxes[i].addEventListener('change', updateJson)
    }
}


