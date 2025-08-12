<template>
  <q-page padding>
    <q-btn label="Add Contact" color="primary" @click="openAddDialog" />

    <q-table title="Contacts" :rows="contacts" :columns="columns" row-key="id" flat>
      <template v-slot:body-cell-actions="props">
        <q-btn flat icon="edit" color="primary" @click="editContact(props.row)" />
        <q-btn flat icon="delete" color="negative" @click="removeContact(props.row.id)" />
      </template>
    </q-table>

    <q-dialog v-model="confirmDeleteVisible">
      <q-card>
        <q-card-section class="text-h6">Confirm Deletion</q-card-section>
        <q-card-section>Are you sure you want to delete this contact?</q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Delete" color="negative" @click="confirmDelete" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialogVisible">
      <q-card style="min-width: 400px; max-width: 600px;">
        <q-card-section>
          <div class="text-h6">{{ editMode ? 'Edit' : 'Add' }} Contact</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="form.name" label="Name" :rules="[val => !!val || 'Name is required']" />
          <q-input v-model="form.email" label="Email" :rules="[
            val => !!val || 'Email is required',
            val => /.+@.+\..+/.test(val) || 'Email must be valid'
          ]" />
          <q-input v-model="form.phone" label="Phone" />
          <q-input v-model="form.address" label="Address" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Save" color="primary" @click="saveContact" :disable="isSaving" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getContacts, addContact, updateContact, deleteContact } from 'src/services/contactService'

const contacts = ref([])
const dialogVisible = ref(false)
const editMode = ref(false)
const form = ref({ id: null, name: '', email: '', phone: '', address: '' })

const columns = [
  { name: 'name', label: 'Name', field: 'name', sortable: true },
  { name: 'email', label: 'Email', field: 'email', sortable: true },
  { name: 'phone', label: 'Phone', field: 'phone', sortable: true },
  { name: 'address', label: 'Address', field: 'address', sortable: true },
  { name: 'actions', label: 'Actions', field: 'actions' }
]

async function loadContacts() {
  contacts.value = await getContacts()
}

function openAddDialog() {
  editMode.value = false
  form.value = { id: null, name: '', email: '', phone: '', address: '' }
  dialogVisible.value = true
}

function editContact(contact) {
  editMode.value = true
  form.value = { ...contact }
  dialogVisible.value = true
}

const isSaving = ref(false)

async function saveContact() {
  isSaving.value = true
  try {
    if (editMode.value) {
      await updateContact(form.value.id, form.value)
    } else {
      await addContact(form.value)
    }
    dialogVisible.value = false
    await loadContacts()
  } catch (error) {
    console.error(error)
  } finally {
    isSaving.value = false
  }
}

const confirmDeleteVisible = ref(false)
let deleteId = null

function removeContact(id) {
  deleteId = id
  confirmDeleteVisible.value = true
}

async function confirmDelete() {
  await deleteContact(deleteId)
  confirmDeleteVisible.value = false
  await loadContacts()
}

onMounted(loadContacts)
</script>
