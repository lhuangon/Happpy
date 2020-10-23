import NursingHomeOne from '../models/NursingHome';
import ImagesView from '../views/images_view';

export default {
 render(nursingHomeOne: NursingHomeOne) {
     return {
        id: nursingHomeOne.id,
        name: nursingHomeOne.name,
        latitude: nursingHomeOne.latitude,
        longitude: nursingHomeOne.longitude,
        about: nursingHomeOne.about,
        instructions: nursingHomeOne.instructions,
        opening_hours: nursingHomeOne.opening_hours,
        open_on_weekends: nursingHomeOne.open_on_weekends,
        images: ImagesView.renderMany(nursingHomeOne.images)
     };
   },

   renderMany(nursingHome: NursingHomeOne[]) {
      return nursingHome.map(nursingHomeOne => this.render(nursingHomeOne))
   }
};