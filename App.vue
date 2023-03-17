<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch 123', this.$store.state.bk.user.aa)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onerror: (erro) => {
			console.error(erro)
		}
	}
</script>

<style>
	/*每个页面公共css */
	#app {
		box-sizing: border-box;
	}
	.page {
		max-width: 450px;
	}
</style>
