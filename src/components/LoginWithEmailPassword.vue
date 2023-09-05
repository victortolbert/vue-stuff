<script setup>
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'someone@email.com',
  password: 'pDHzQOyCdRlBvHOejdeB',
})
</script>
