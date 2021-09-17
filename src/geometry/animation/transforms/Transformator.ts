import { Figure } from "../../figures/Figure";
import Transition from "../Transition";
import { TransitionableProperty } from "../TransitionableProperty";

export class Transformator {
    private transforms = new Map<string, TransitionableProperty>()

    setTransition(key: string, t: Transition) {
        const prop = this.transforms.get(key)
        if(prop)
            prop.transition = t;
    }

    getTransition(key: string) {
        return this.transforms.get(key).transition
    }

    getProperty(key: string) {
        return this.transforms.get(key);
    }

    getTransform(key: string) {
        const prop = this.transforms.get(key);
        if(prop)
            return prop.value;
        return 0;
    }

    setTransform(key: string, value: number) {
        let prop = this.transforms.get(key)
        if(!prop)
        {
            prop = new TransitionableProperty(value);
            this.transforms.set(key, prop);
        }
        else
            prop.value = value;
        
    }
}