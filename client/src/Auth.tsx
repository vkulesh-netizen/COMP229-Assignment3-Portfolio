import {createContext,useContext,useEffect,useState,ReactNode} from 'react'
import {api} from './api'
type User={_id:string;name:string;email:string;role:'admin'|'user'}
const Context=createContext<{user:User|null;loading:boolean;signin:(email:string,password:string)=>Promise<void>;signout:()=>Promise<void>}>({user:null,loading:true,signin:async()=>{},signout:async()=>{}})
export function AuthProvider({children}:{children:ReactNode}) {
 const [user,setUser]=useState<User|null>(null),[loading,setLoading]=useState(true)
 useEffect(()=>{api('/auth/me').then(setUser).catch(()=>setUser(null)).finally(()=>setLoading(false))},[])
 async function signin(email:string,password:string){const data=await api('/auth/signin',{method:'POST',body:JSON.stringify({email,password})});setUser(data.user)}
 async function signout(){await api('/auth/signout');setUser(null)}
 return <Context.Provider value={{user,loading,signin,signout}}>{children}</Context.Provider>
}
export const useAuth=()=>useContext(Context)
