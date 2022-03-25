<template>
  <!-- Fixed navbar -->
	<nav class="navbar navbar-expand-sm bg-dark navbar-dark px-3">
		<a class="navbar-brand" href="/">
			<span>openWB</span>
		</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="collapsibleNavbar">
			<ul class="navbar-nav">

				<!-- <li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle" href="#" id="navbardropLogging" data-toggle="dropdown">
						Logging
					</a>
					<div class="dropdown-menu">
						<a class="dropdown-item" id="navLadelog" href="logging/chargelog/ladelog.php">Lade-Log</a>
						<a class="dropdown-item" id="navChartlog" href="logging/index.php">Graph</a>
					</div>
				</li> -->

				<li class="nav-item">
					<a class="nav-link" id="navStatus" href="#">Status</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#">Hilfe</a>
				</li>

				<li class="nav-item">
					<a class="nav-link" id="navSettings" href="/settings/index.html">Einstellungen</a>
				</li>

			</ul>
		</div>
	</nav>
</template>

<script setup lang="ts">

</script>

<style>

</style>