<script setup>
const { data, error } = await supabase.auth.signInWithOtp({
  email: 'victor.tolbert@gmail.com',
})
</script>
