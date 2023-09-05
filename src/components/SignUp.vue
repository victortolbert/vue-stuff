<script setup>
const { data, error } = await supabase.auth.signUp({
  email: 'someone@email.com',
  password: 'pDHzQOyCdRlBvHOejdeB',
})
</script>
