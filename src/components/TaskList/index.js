// Importação de componentes 
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

export default function TaskList({ data, handleDelete }){
    return(
        <Animatable.View // Estilização animada p/ elemento da lista
        style={styles.container} // Definição de uso style
        animation="bounceIn" // Animação "bounce" ao criar item
        useNativeDriver // Componente necessário p/ animação específica
        >
            {/*TouchableOpacity-  Propriedade da biblioteca react-native p/ funcionalidade*/}
            {/*Segunda linha -  Estilização do símbolo da tarefa (tamanho e cor) */}
            <TouchableOpacity onPress={ ()=> handleDelete(data)}> 
                <Ionicons name="md-checkmark-circle" size={30} color="#121212"/> 
            </TouchableOpacity>

            {/* Marcação de elementos na tela (demarcação do style criado abaixo) */}
            <View>
                <Text style={styles.task}>{data.task}</Text> 
            </View>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({ // Definição das propriedades CSS (style)
    container: { // Estilização da página
        flex: 1,
        margin: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:  '#fff',
        borderRadius: 5,
        padding: 7,
        elevation: 1.5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 1, height: 3,}
    },
    task:{ // Estilização do item
        color: '#121212',
        fontSize: 20,
        paddingLeft: 8,
        paddingRight: 20,
    }
})