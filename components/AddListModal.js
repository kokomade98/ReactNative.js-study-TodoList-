import React, { Component } from 'react'
import { Text, StyleSheet, View, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import Colors from '../Colors'
import tempData from '../tempData';

export default class AddListModal extends Component {
    backgroundColors = ["#5CD859", "#24A6D9", "#595BD9", "#8022D9", "#D159D8", "#D85963", "#D88559"];

    state = {
        name: "",
        color: this.backgroundColors[0]
    }

    createTodo = () => {
        const { name, color } = this.state;

        tempData.push({
            name,
            color,
            todos: []
        })

        this.setState({ name: "" });
        this.props.closeModal();
    }

    renderColors() {
        return this.backgroundColors.map(color => {
            return (
                <TouchableOpacity
                    key={color}
                    style={[styles.colorSelect, { backgroundColor: color }]}
                    onPress={() => this.setState({ color })}
                />
            )
        })
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <TouchableOpacity style={{ position: "absolute", top: 34, right: 32 }} onPress={this.props.closeModal}>
                    <AntDesign name="close" size={20} color={Colors.black} />
                </TouchableOpacity>

                <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
                    <Text style={styles.title}>Create Todo List</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="List Name?" 
                        onChangeText={text => this.setState({ name: text })}
                    />

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>{this.renderColors()}</View>

                    {/* StyleSheet 속성과 default CSS 속성을 같이 쓸 경우 {[ StyleSheet , { default } ]} 를 이용하자! */}
                    <TouchableOpacity
                        style={[styles.create, { backgroundColor: this.state.color }]}
                        onPress={this.createTodo}
                    >
                        <Text style={{ color: Colors.white, fontWeight: "600" }}>Create!</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: Colors.black,
        alignSelf: "center",
        marginBottom: 16
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.blue,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18
    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4
    }
})
