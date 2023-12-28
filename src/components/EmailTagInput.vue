<script lang="ts">
import { ref, Ref, watch, nextTick, onMounted } from "vue";
export default {
  props: {
    name: { type: String, default: "" },
    modelValue: { type: Array, default: () => [] },
    options: {
      type: [Array, Boolean], 
      default: false,
      validator: (value) => Array.isArray(value) || typeof value === 'boolean'
    },
    allowCustom: { type: Boolean, default: true },
    showCount: { type: Boolean, default: false },
  },
  setup(props, { emit }) {
    const tags = ref(props.modelValue);
    const newTag = ref("");

    const addTag = (tag: string) => {
      if (tag && !tags.value.includes(tag)) {
        tags.value.push(tag);
        newTag.value = "";
        emit("update:modelValue", tags.value);
      }
    };

    const removeTag = (index: number) => {
      if (index >= 0 && index < tags.value.length) {
        tags.value.splice(index, 1);
        emit("update:modelValue", tags.value);
      }
    };

    const paddingLeft = ref(10);
    const tagsUl = ref() as Ref <HTMLElement | null> ;

    const onTagsChange = () => {
      const extraCushion = 15;
      paddingLeft.value = tagsUl.value?.clientWidth + extraCushion;
      tagsUl.value?.scrollTo(tagsUl.value.scrollWidth, 0);
    };

    watch(tags, () => nextTick(onTagsChange), { deep: true });
    onMounted(onTagsChange);

    return {
      tags,
      newTag,
      addTag,
      removeTag,
      paddingLeft,
      tagsUl,
    };
  },
};
</script>

<!-- Template and Style remain unchanged -->
