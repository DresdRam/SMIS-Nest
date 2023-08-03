export class Normalize {
    static normalizeName(name: string) {
        let new_name = name;

        new_name = new_name.replace(/أ/g, 'ا');
        new_name = new_name.replace(/آ/g, 'ا');
        new_name = new_name.replace(/إ/g, 'ا');
        new_name = new_name.replace(/ى/g, 'ي');
        new_name = new_name.replace(/ة/g, 'ه');
        new_name = new_name.replace(/عبد\s/g, 'عبد');
        new_name = new_name.replace(/الدين/g, ' الدين');
        new_name = new_name.replace(/الدين\s/g, ' الدين');

        return new_name;
    }
}