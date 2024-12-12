<template>
    <div v-if="isVisible" class="modal-overlay visible" @click="closeModal">
        <div class="modal-content visible" :class="`modal-${modalType}`" @click.stop>
            <header class="modal-header">
                <slot name="header">{{ headerName }}</slot>
                <button @click="closeModal" aria-label="Close">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </header>
            <main class="modal-body">
                <slot name="body">No content available.</slot>
            </main>
            <footer class="modal-footer">
                <slot name="footer">
                    <button @click="closeModal">Close</button>
                    <button @click="submit">Submit</button>
                </slot>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isVisible: { type: Boolean, default: false },
        headerName: { type: String, default: 'Modal' },
        modalType: { type: String, default: 'default' }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        submit() {
            this.$emit('submit');
        },
        handleKeydown(event) {
            if (event.key === 'Escape') {
                this.closeModal();
            }
        }
    },
    mounted() {
        document.addEventListener('keydown', this.handleKeydown);
    },
    beforeUnmount() {
        document.removeEventListener('keydown', this.handleKeydown);
    }
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.modal-overlay.visible {
    opacity: 1;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    max-width: 500px;
    width: 100%;
    position: relative;
    transform: translateY(-20px);
    transition: transform 0.3s ease, opacity 0.3s ease;
    opacity: 0;
}

.modal-content.visible {
    transform: translateY(0);
    opacity: 1;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-body {
    margin: 20px 0;
}

.modal-footer {
    text-align: right;
}

/* Modal types */
.modal-success {
    border: 2px solid green;
}
.modal-error {
    border: 2px solid red;
}
.modal-info {
    border: 2px solid blue;
}

/* Responsive Design */
@media (max-width: 768px) {
    .modal-content {
        max-width: 90%;
    }
}
</style>
