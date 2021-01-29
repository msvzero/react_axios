import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios  from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  }
}))

//Axios instance
const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
})

//Axios Global
axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';


//Axios interceptor
axios.interceptors.request.use(config => {
  console.log('Configure: ', config)
  return config
}, error => {
  return Promise.reject(error)
})

// Axios custom headers
const customHeader = () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'token'
    }
  }
  axios.post('https://jsonplaceholder.typicode.com/todos',{title: "New Todo",completed: false}, config)
  .then(res => console.log(res.data))
  .catch(error => console.log(error))
}

const requestHandler  = (botton) => {
  console.log('Tipo de petición: ', botton);
  switch(botton){
    case 'get':
      //Forma 1
      //  axios({
      //    method: 'GET',
      //    url:'https://jsonplaceholder.typicode.com/todos',
      //    params: {
      //      _limit:5
      //    }
      //  })
      //Forma 2
      // axios.get('https://jsonplaceholder.typicode.com/todos', {params:{_limit:5}})
      //Forma 3
      // axios('https://jsonplaceholder.typicode.com/todos?_limit=5')
      //Forma 4
      axiosInstance.get('/todos?_limit=5')
      .then(res => console.log(res.data))
      .catch(error => console.log(error))
       break;
    case "post":
      //Forma 1
      //  axios({
      //    method: 'POST',
      //    url:'https://jsonplaceholder.typicode.com/todos',
      //    data: {
      //      title: "New Todo",
      //      completed: false
      //    }
      //   })
      //Forma 2
      axios.post('https://jsonplaceholder.typicode.com/todos', {data:{title:"New Todo", completed:false}})
      .then(res => console.log(res.data))
      .catch(error => console.log(error))
      break;
    case "update":
      //put:  actualiza todo el documento, no importa si solo se quiere actualizar un solo atributo
      // axios.put('https://jsonplaceholder.typicode.com/todos/1', {title:"Updated todo",completed: true})
      // .then(res => console.log(res.data))
      // .catch(error => console.log(error))
      //patch: solo actualiza el atributo que le pasamos como parametro, no borra los demas
      axios.patch('https://jsonplaceholder.typicode.com/todos/2', {title:"Updated todo",completed: true})
      .then(res => console.log(res.data))
      .catch(error => console.log(error))
      break;
    case "delete":
      axios.delete('https://jsonplaceholder.typicode.com/todos/3')
      .then(res => console.log(res.data))
      .catch(error => console.log(error))
      break;
    case "simultaneus":
      axios.all([
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
        axios.get('https://jsonplaceholder.typicode.com/posts')
      ])
          // .then(res => {
          //   console.log(res[0])
          //   console.log(res[1])
          // })
      .then(axios.spread((todos, posts) => {
        console.log('Todos: ', todos)
        console.log('Posts: ', posts)
      } ))
      .catch(error => console.log(error))
      break;
    
  }
}

const App = () => {
  const classes = useStyles();
  return(
    <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
              <Grid key={1} item>
              <h1>Seleccione una petición</h1>
              </Grid>
          </Grid>
            <Grid container justify="center" spacing={2}>
              <Grid key={1} item>
                    <Button onClick={()=>requestHandler("get")} variant="contained" color="primary">GET</Button>
                </Grid>
              <Grid key={2} item>
                    <Button onClick={()=>requestHandler("post")} variant="contained" color="primary">POST</Button>
                </Grid>
              <Grid key={3} item>
                    <Button onClick={()=>requestHandler("update")} variant="contained" color="primary">UPDATE/PATH</Button>
                </Grid>
              <Grid key={4} item>
                    <Button onClick={()=>requestHandler("delete")} variant="contained" color="secondary">DELETE</Button>
                </Grid>
              <Grid key={5} item>
                    <Button onClick={()=>requestHandler("simultaneus")} variant="contained">SIMULTANEUS REQUEST</Button>
                </Grid>
              <Grid key={6} item>
                    <Button onClick={()=>customHeader()} variant="contained">CUSTOM HEADERS</Button>
              </Grid>
            </Grid>
        </Grid>
    </Grid>
  );
}
export default App;