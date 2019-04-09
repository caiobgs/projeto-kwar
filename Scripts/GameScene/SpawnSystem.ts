
namespace game 
{
    /** New System */
    export class SpawnSystem extends ut.ComponentSystem 
	{
        OnUpdate():void 
		{
			this.world.forEach([game.Spawner], (spawner) => 
			{
				if (spawner.isPaused) 
					return;

				let time = spawner.time;
				let delay = spawner.delay;
				let decrement = spawner.SpawnerDecrement
				
				time -= ut.Time.deltaTime();

				if (time <= 0) 
				{
					time += delay;

					if (delay >= 0.3) {

						delay -= decrement;

					}
					
					console.log("Sapawner delay = " + delay)

					let spawqtd = 0

					while (spawqtd < 2) {

						spawqtd++
						ut.EntityGroup.instantiate(this.world, spawner.spawnedGroup);

					}
					
					
					spawner.delay = delay
				}

				spawner.time = time;
			});
        }
    }
}
