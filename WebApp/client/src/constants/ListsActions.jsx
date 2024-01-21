import { AiFillDelete, AiFillEye, AiFillPlusSquare } from "react-icons/ai"
import {MdGroupAdd} from 'react-icons/Md';
import { BiSolidEditAlt } from "react-icons/Bi"
import {BsPersonFillAdd} from 'react-icons/Bs'
import { GrAddCircle } from "react-icons/Gr"
import DataFetcher from "../api/DataFetcher"

const ConsulterCours = ({ navigate, item }) => {
    navigate(`/cours/${item.urlSlug}`)
}
const AjouterChapitreAuCours = ({ navigate, item }) => {
    console.log('add');
    navigate('/ajouter-chapitre',{state:{courId:item.id}})
}
const AjouterBenefAuCours = ({ navigate, item }) => {
    console.log('add');
    navigate('/ajouter-beneficiare',{state:{courId:item.id}})
}
const AjouterGrpAuCours = ({ navigate, item }) => {
    console.log('add');
    navigate('/ajouter-groupe',{state:{courId:item.id}})
}
const ModifierCours = ({ navigate, item }) => {
    navigate('/editer-cours',{state:{cours:item}})
}
const SupprimerCours = async ({ navigate, item }) => {
    await DataFetcher({ method: 'DELETE', path: `/cours/${item.id}` })
}


const ConsulterChapitre = ({ navigate, item }) => {

}
const ModifierChapitre = ({ navigate, item }) => {
    navigate('/editer-chapitre',{state:{chapitre:item}})
}
const SupprimerChapitre = async ({ navigate, item }) => {
    await DataFetcher({ method: 'DELETE', path: `/chapitres/${item.id}` })
}
const ConsulterUser = ({ navigate, item }) => {

}
const ModifierUser = ({ navigate, item }) => {

}
const SupprimerUser = async ({ navigate, item }) => {
    await DataFetcher({ method: 'DELETE', path: `/users/${item.id}` })
}

const ConsulterBenef = ({ navigate, item }) => {
    navigate('/consulter-beneficiare',{state:{beneficiaireId:item.id ,beneficiaireName:item.nom ,beneficiairePrenom:item.prenom, beneficiaireSexe:item.sex, beneficiaireDateNaiss:item.dateNaissance}})
}
const ModifierBenef = ({ navigate, item }) => {

}
const SupprimerBenef = async ({ navigate, item }) => {
    await DataFetcher({ method: 'DELETE', path: `/beneficiaires/${item.id}` })
}
const ConsulterGrp = ({ navigate, item }) => {

}
const ModifierGrp = ({ navigate, item }) => {

}
const SupprimerGrp = async ({ navigate, item }) => {
    await DataFetcher({ method: 'DELETE', path: `/groupes/${item.id}` })
}
const AjouterBenefAuGrp = ({ navigate, item }) => {
    console.log('add');
    navigate('/ajouter-beneficiare',{state:{groupeId:item.id}})}



export const userActions = [
    {
        id: 1,
        title: 'Consulter',
        icone: AiFillEye,
        submit: ConsulterCours,
        showModal: false,
    },
    {
        id: 2,
        title:'bénéficiaire',
        icone: BsPersonFillAdd,
        submit: AjouterBenefAuCours,
        showModal: false,
    },
    {
        id: 3,
        title:'Groupe',
        icone: MdGroupAdd,
        submit: AjouterGrpAuCours,
        showModal: false,
    },
    {
        id: 4,
        title: 'Ajouter chapitre',
        icone: AiFillPlusSquare,
        submit: AjouterChapitreAuCours,
        showModal: false,
    },
    {
        id: 5,
        title: 'Modifier',
        icone: BiSolidEditAlt,
        submit: ModifierCours,
        showModal: false,
    },
    {
        id: 6,
        title: 'Supprimer',
        icone: AiFillDelete,
        submit: SupprimerCours,
        showModal: true,
        modal: {
            type: 'confirmation',
            title: 'Confirmation de suppression',
            body: 'Vous voulez vraiment supprimmer cette item ?',
        }
    },

]

export const parkingUserActions = [
    {
        id: 1,
        title: 'Consulter',
        icone: AiFillEye,
        submit: ConsulterChapitre,
        showModal: false,
    },

    {
        id: 2,
        title: 'Modifier',
        icone: BiSolidEditAlt,
        submit: ModifierChapitre,
        showModal: false,
    },
    {
        id: 3,
        title: 'Supprimer',
        icone: AiFillDelete,
        submit: SupprimerChapitre,
        showModal: true,
        modal: {
            type: 'confirmation',
            title: 'Confirmation de suppression',
            body: 'Vous voulez vraiment supprimmer ce chapitre ?',
        }
    },

]

export const employeeActions = [
    {
        id: 1,
        title: 'Consulter',
        icone: AiFillEye,
        submit: ConsulterChapitre,
        showModal: false,
    },

    {
        id: 2,
        title: 'Modifier',
        icone: BiSolidEditAlt,
        submit: ModifierChapitre,
        showModal: false,
    },
    {
        id: 3,
        title: 'Supprimer',
        icone: AiFillDelete,
        submit: SupprimerChapitre,
        showModal: true,
        modal: {
            type: 'confirmation',
            title: 'Confirmation de suppression',
            body: 'Vous voulez vraiment supprimmer ce chapitre ?',
        }
    },

]

export const visitorActions = [
    {
        id: 1,
        title: 'Consulter',
        icone: AiFillEye,
        submit: ConsulterUser,
        showModal: false,
    },

    {
        id: 2,
        title: 'Modifier',
        icone: BiSolidEditAlt,
        submit: ModifierUser,
        showModal: false,
    },
    {
        id: 3,
        title: 'Supprimer',
        icone: AiFillDelete,
        submit: SupprimerUser,
        showModal: true,
        modal: {
            type: 'confirmation',
            title: 'Confirmation de suppression',
            body: 'Vous voulez vraiment supprimmer cet utilisateur ?',
        }
    },

]

export  const siteActions =  [{
    id: 1,
    title: 'Consulter',
    icone: AiFillEye,
    submit: ConsulterBenef,
    showModal: false,
},

{
    id: 2,
    title: 'Modifier',
    icone: BiSolidEditAlt,
    submit: ModifierBenef,
    showModal: false,
},
{
    id: 3,
    title: 'Supprimer',
    icone: AiFillDelete,
    submit: SupprimerBenef,
    showModal: true,
    modal: {
        type: 'confirmation',
        title: 'Confirmation de suppression',
        body: 'Vous voulez vraiment supprimmer ce bénéficiaire ?',
    }
},

]

export  const vehicleActions =  [{
    id: 1,
    title: 'Consulter',
    icone: AiFillEye,
    submit: ConsulterGrp,
    showModal: false,
},
{
    id: 2,
    title:'bénéficiaire',
    icone: BsPersonFillAdd,
    submit: AjouterBenefAuGrp,
    showModal: false,
},

{
    id: 3,
    title: 'Modifier',
    icone: BiSolidEditAlt,
    submit: ModifierGrp,
    showModal: false,
},
{
    id: 4,
    title: 'Supprimer',
    icone: AiFillDelete,
    submit: SupprimerGrp,
    showModal: true,
    modal: {
        type: 'confirmation',
        title: 'Confirmation de suppression',
        body: 'Vous voulez vraiment supprimmer ce groupe ?',
    }
},

]


export  const permissionActions =  [{
    id: 1,
    title: 'Consulter',
    icone: AiFillEye,
    submit: ConsulterGrp,
    showModal: false,
},
{
    id: 2,
    title:'bénéficiaire',
    icone: BsPersonFillAdd,
    submit: AjouterBenefAuGrp,
    showModal: false,
},

{
    id: 3,
    title: 'Modifier',
    icone: BiSolidEditAlt,
    submit: ModifierGrp,
    showModal: false,
},
{
    id: 4,
    title: 'Supprimer',
    icone: AiFillDelete,
    submit: SupprimerGrp,
    showModal: true,
    modal: {
        type: 'confirmation',
        title: 'Confirmation de suppression',
        body: 'Vous voulez vraiment supprimmer ce groupe ?',
    }
},

]





