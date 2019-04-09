
namespace game 
{
    /** New Filter */
    export class EnemyBehaviorFilter extends ut.EntityFilter 
	{
        entity: ut.Entity;
        position: ut.Core2D.TransformLocalPosition;
		tag: game.EnemyTag;
		speed: game.MoveSpeed;
		speedChange: game.ChangeOverTime;
		bounds: game.Boundaries;
    }

    /** New Behaviour */
    export class EnemyBehavior extends ut.ComponentBehaviour 
	{

        data: EnemyBehaviorFilter;

        OnEntityEnable():void 
		{
			let BackgroundResponsive = this.world.getComponentData(this.world.getEntityByName("BackgroundResponsive"), game.ComponenteTeste)

			let SpriteSize = this.world.getComponentData(BackgroundResponsive.BackgrundImage, ut.Core2D.Sprite2DRendererOptions)
			
            let totalTime = ut.Time.time();
			let newSpeed = this.data.speed.speed + (this.data.speedChange.changePerSecond * totalTime);
			
			this.data.speed.speed = newSpeed;
			
			// let randomX = getRandom(this.data.bounds.minX, this.data.bounds.maxX);
			// let newPos = new Vector3(randomX, this.data.bounds.maxY, 0);

			let randomX = getRandom(-(SpriteSize.size.x/5.5), SpriteSize.size.x/5.5);
			let newPos = new Vector3(randomX, SpriteSize.size.y/5.5, 0);
			
			this.data.position.position = newPos;

			console.log("enemy initialized. Speed: " + newSpeed);
        }
        
        OnEntityUpdate():void 
		{
			let BackgroundResponsive = this.world.getComponentData(this.world.getEntityByName("BackgroundResponsive"), game.ComponenteTeste)

			let SpriteSize = this.world.getComponentData(BackgroundResponsive.BackgrundImage, ut.Core2D.Sprite2DRendererOptions)
			
            let localPosition = this.data.position.position;
			localPosition.y -= this.data.speed.speed * ut.Time.deltaTime();

			this.data.position.position = localPosition;

			if(localPosition.y <= -(SpriteSize.size.y/5.5))	
				//this.world.addComponent(this.entity, ut.Disabled);
				this.world.destroyEntity(this.data.entity);
        }
    }

	function getRandom(min, max) 
	{
		return Math.random() * (max - min + 1) + min;
	}
}
