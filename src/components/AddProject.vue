<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({ 
    name: "AddProject",

    props: {
        text: {
            type: String,
            required: true
            },
    },
})



