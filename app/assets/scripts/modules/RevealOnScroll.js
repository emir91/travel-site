import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

class RevealOnScroll{
    constructor(els, tresholdPercent){
        this.tresholdPercent = tresholdPercent;
        this.itemsToReveal = els;
        this.browserHeight = window.innerHeight;
        this.hideInitally();
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
        this.events();
    }

    events(){
        window.addEventListener("scroll", this.scrollThrottle);
        window.addEventListener("resize", debounce(() => {
            console.log('Resize just ran')
            this.browserHeight = window.innerHeight;
        }, 333))
    }

    calcCaller(){
        console.log('Scroll function ran')
        this.itemsToReveal.forEach(el => {
            if(el.isReveald == false){
                this.calculateIfScrolledTo(el);
            }
        })
    }

    calculateIfScrolledTo(el){
       if(window.scrollY + this.browserHeight > el.offsetTop){
        console.log('Element was calculated')
        let scrollPercent = (el.getBoundingClientRect().y / this.browserHeight) * 100;

        if(scrollPercent < this.tresholdPercent){
            el.classList.add('reveal-item--is-visible');
            el.isReveald = true;
            if(el.isLastItem){
                window.removeEventListener('scroll', this.scrollThrottle)
            }
        }
       }
    }

    hideInitally(){
        this.itemsToReveal.forEach(el => {
            el.classList.add('reveal-item');
            el.isReveald = false;
        })
        this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
    }
}

export default RevealOnScroll;