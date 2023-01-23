export default defineNuxtRouteMiddleware((to, from) => {
	const user = useSupabaseUser();

	if (
		!user.value &&
		(to.path.startsWith('/notes') || to.path.startsWith('/profile'))
	) {
		return navigateTo('/login');
	} else if (user.value && to.path === '/login') {
		return navigateTo('/notes');
	}
});
