// import { FormEventHandler, useCallback, useState } from 'react';
 
// const ConvertkitSignupForm: React.FC<
//   React.PropsWithChildren<{
//     formId: string;
//   }>
// > = ({ formId, children }) => {
//   const name = 'email';
//   const [success, setSuccess] = useState<boolean | undefined>();
 
//   const onSubmit: FormEventHandler = useCallback(
//     async (event) => {
//       event.preventDefault();
 
//       const target = event.target as HTMLFormElement;
//       const data = new FormData(target);
//       const email = data.get(name);
 
//       const body = JSON.stringify({
//         formId,
//         email,
//       });
 
//       const headers = new Headers({
//         'Content-Type': 'application/json; charset=utf-8',
//       });
 
//       try {
//         await fetch(`/api/convertkit/subscribe`, {
//           method: 'POST',
//           mode: 'cors',
//           cache: 'no-cache',
//           headers,
//           body,
//         });
 
//         setSuccess(true);
//       } catch {
//         setSuccess(false);
//       }
//     },
//     [formId]
//   );
 
//   if (success === false) {
//     return <p>Apologies, an error occurred</p>;
//   }
 
//   if (success) {
//     return <p>You&apos;re in! Thank you for subscribing.</p>;
//   }
 
//   return (
//     <>
//       <form
//         target="_blank"
//         className={`space-around flex w-full flex-grow justify-center`}
//         onSubmit={onSubmit}
//       >
//         <input
//           type="email"
//           className="TextInput w-full !rounded-tr-none !rounded-br-none border-r-transparent py-1 text-sm hover:border-r-transparent md:w-80 md:text-base"
//           name={name}
//           aria-label="Your email address"
//           placeholder="your@email.com"
//           required
//         />
 
//         <button className="Button min-w-[6rem] rounded-tl-none rounded-bl-none text-sm md:text-base">
//           {children ?? 'Sign up'}
//         </button>
//       </form>
 
//       <p className={'mt-2 text-center text-sm md:text-xs'}>
//         Subscribe to our newsletter to receive updates
//       </p>
//     </>
//   );
// };
 
// export default ConvertkitSignupForm;