// Importação de componentes react-native
import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, 
  TouchableOpacity, FlatList, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskList from './src/components/TaskList';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Animatable from 'react-native-animatable';

// Botão p/ adicionar tarefas com estilização animada
 const AnimateBtn = Animatable.createAnimatableComponent(TouchableOpacity);

// Definicação do funcionamento do site (funções const)
export default function App() {
  const [task, setTask] = useState([]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  // Busca os dados no storage ao iniciar o app
  useEffect(() => {
    async function loadTask(){
      const taskStorage = await AsyncStorage.getItem('@task'); // Criação de lista de elementos, "await" p/ esperar conferência na lista

      if(taskStorage){   // Verifica se tem dados
        setTask(JSON.parse(taskStorage));
      }
    }

    loadTask(); // Carrega o elemento, caso exista

  }, []);  // Execução da lista em branco

  // Modo para salvar nova tarefa em lista
  useEffect(() => {

      async function saveTask(){ // Async funciona em conjunto com await, controlando a ordem de execução (promessas)
        await AsyncStorage.setItem('@task', JSON.stringify(task)); // Salva em formato JSON
      }

      saveTask();
    
  }, [task]); // fica monitorando a lista, so executa para lista

function handleAdd(){ // Função para criação de novo elemento
  
  if(input === '') return;
  
  const data = { // Retorno de novo escopo p/ item
    key: input,
    task: input
  };

  setTask([...task, data]);
  setOpen(false);
  setInput('');
}

const handleDelete = useCallback((data) => { // Função p/ deletar item

  const find = task.filter(r => r.key !== data.key); // Filtra todos menos o que selecionei
  setTask(find); // Mosta todos menos o selecionado

});
  

  // Retorno visual das funções e propriedades criadas 
  return (

    <SafeAreaView style={styles.container}>

      <StatusBar backgroundColor="#171D31" barStyle="light-content"/>
      <View style={styles.content}>
        <Text style={styles.title}>Minhas Tarefas</Text>
      </View>

      <FlatList
        marginHorizontal={10}
        showsHorizontalScrollIndicator={false}  /* Tira barra de rolagem*/
        data={task} /* Todos os dados ficam aqui*/
        keyExtractor={ (item) => String(item.key) } /* Todos os dados ficam aqui*/
        renderItem={ ({ item }) => <TaskList data={item} handleDelete={handleDelete} />}
      />
      
      
      <Modal animationType="slide" transparent={false} visible={open}>
        <SafeAreaView style={styles.modal}>

          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={ () => setOpen(false) }>
              <Ionicons style={{marginLeft: 5, marginRight: 5}} name="md-arrow-back" size={40} color="#fff"/>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Nova Tarefa</Text>
          </View>

          <Animatable.View 
          animation="fadeInUp"  
          useNativeDriver
          style={styles.modalBody}>
            <TextInput
              multiline={true}
              placeholderTextColor="#747474"
              autoCorrect={false}
              placeholder="O que precisa fazer hoje?"
              style={styles.input}
              value={input}
              onChangeText={ (texto) => setInput(texto)}
            />
            <TouchableOpacity style={styles.handleAdd} onPress={handleAdd}>
              <Text style={styles.handleAddText}>Cadastrar</Text>
            </TouchableOpacity>
          </Animatable.View>

        </SafeAreaView>
      </Modal>

      <AnimateBtn // Definiçaõ de animação 
      style={styles.fab}
      useNativeDriver
      animation="bounceInUp"
      duration={1500}
      onPress={ () => setOpen(true) }
      >
        <Ionicons name="ios-add" size={35} color="#fff"/>
      </AnimateBtn>

    </SafeAreaView>
  );
}
// Criação da estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171D31',
  },
  content: {

  },
  title: {
    marginTop: 10,
    paddingBottom: 10,
    fontSize: 25,
    textAlign: 'center',
    color: '#FFF'
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#0094ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    right: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 3,}
  },
  modal: {
    flex: 1,
    backgroundColor: '#171D31',
  },
  modalHeader:{ 
    marginLeft: 10,
    marginTop:20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitle: {
    marginLeft: 15,
    fontSize: 23,
    color: '#fff'
  },
  modalBody: {
    marginTop: 15, 
  },
  input: {
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    backgroundColor: '#fff',
    padding: 9,
    height: 85,
    textAlignVertical: 'top',
    color: '#000',
    borderRadius: 5,
  },
  handleAdd:{
    backgroundColor: '#fff',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderRadius: 5
  },
  handleAddText: {
    fontSize: 20 
  }

});
