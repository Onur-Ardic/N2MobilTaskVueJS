<template>
  <div>
    <h3 class="text-xl font-bold">Todos</h3>
    <ul>
      <li v-if="localTodos.length === 0" class="text-gray-500">No Todos Available</li>
      <li v-else v-for="todo in localTodos" :key="todo.id" class="flex gap-3 mt-4 items-center">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodo(todo.id)"
          class="form-checkbox h-5 w-5 text-purple-600 border-purple-600 bg-pur focus:ring-purple-500"
        />
        <p :class="{ 'line-through': todo.completed }">{{ todo.title }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { getTodosStore } from '@/stores/todos'

export default {
  props: ['userId'],
  setup(props) {
    const getTodos = getTodosStore()
    const { todos } = storeToRefs(getTodos)

    const localTodos = computed(() => {
      return todos.value.filter((todo) => todo.userId === props.userId)
    })

    onMounted(() => {
      getTodos.fetchTodos()
    })

    const toggleTodo = (id) => {
      const todo = todos.value.find((todo) => todo.id === id)
      if (todo) {
        todo.completed = !todo.completed
        saveTodosToLocalStorage()
      }
    }

    const saveTodosToLocalStorage = () => {
      const updatedTodos = todos.value.map((todo) => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        userId: todo.userId,
      }))
      localStorage.setItem(`todos_${props.userId}`, JSON.stringify(updatedTodos))
    }

    return { localTodos, toggleTodo }
  },
}
</script>
