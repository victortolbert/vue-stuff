<script setup>
const { data, error } = await supabase.auth.resetPasswordForEmail(email)
</script>
