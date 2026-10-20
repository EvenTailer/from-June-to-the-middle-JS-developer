import type { Chapter } from '../../../../entities/module/model/types';

const L = (en: string, ru: string) => ({ en, ru });

export const nextCh04: Chapter = {
  id: 'next-ch4',
  title: L('Server actions', 'Серверные действия'),
  summary: L(
    'How a server action turns a function into an endpoint, why every action must validate and authorise on its own, how the client learns about the result, and what still works without JavaScript.',
    'Как серверное действие превращает функцию в эндпоинт, почему каждое действие обязано само проверять вход и права, как клиент узнаёт о результате и что продолжает работать без JavaScript.'
  ),
  sections: [
    {
      id: 'next-ch4-s1',
      title: L('What a server action is', 'Что такое серверное действие'),
      body: L(
        'A server action is a function that runs on the server and is called from the browser. You mark a file or a function with the "use server" directive and the framework compiles the module: in the client bundle the implementation is replaced by a reference, an encrypted action identifier plus a dispatcher that sends a POST request back to the server. The function body never leaves the server, but the endpoint that runs it does.\n\nThat is why an action is a POST request like any other, and why it has to be treated as an untrusted entry point. The action identifier is encrypted at build time and unused functions are stripped from the bundle, so an action that is never referenced is not reachable at all. But any action that is referenced can be called by anyone who can construct the same request, whether or not they ever saw the button that triggers it.\n\nActions are usually attached to a form. React extends the HTML form element so that the `action` attribute may take a function, and the function then receives the `FormData` object automatically. An action can also be invoked from an event handler or from an effect, wrapped in `startTransition`, and it can be bound to extra arguments with `bind`, which is how an identifier that is not a form field reaches the server.\n\nThe response carries two things at once. Next.js performs the mutation and, when the action invalidates cached data, re-renders the current route in the same request, and the reply contains the action return value and a freshly rendered RSC payload. The client commits that payload as a seeded navigation, so the page updates without a second request to fetch the new UI.',
        'Серверное действие — это функция, которая выполняется на сервере, но вызывается из браузера. Файл или функцию помечают директивой "use server", и компилятор перерабатывает модуль: в клиентском бандле реализация заменяется ссылкой, зашифрованным идентификатором действия и диспетчером, который отправляет POST-запрос обратно на сервер. Тело функции остаётся на сервере, но эндпоинт, который её выполняет, доступен извне.\n\nИменно поэтому действие — это такой же POST-запрос, и к нему надо относиться как к недоверенной точке входа. Идентификатор действия шифруется при сборке, а неиспользуемые функции вырезаются из бандла, поэтому недостижимо то действие, на которое никто не ссылался. Но любое используемое действие может вызвать тот, кто умеет собрать такой же запрос, независимо от того, видел ли он кнопку.\n\nДействия обычно вешают на форму. React расширяет HTML-элемент формы так, что атрибут `action` может принимать функцию, и тогда функция автоматически получает объект `FormData`. Действие можно вызвать и из обработчика события, и из эффекта, обернув вызов в `startTransition`, а дополнительные аргументы можно привязать через `bind` — так идентификатор, которого нет среди полей формы, всё равно доходит до сервера.\n\nОтвет несёт сразу два значения. Next.js выполняет мутацию и, если действие сбрасывает кэшированные данные, перерендеривает текущий маршрут в том же запросе, и ответ содержит и возвращённое значение действия, и свежесобранную RSC-полезную нагрузку. Клиент применяет эту нагрузку как навигацию с данными, и страница обновляется без второго запроса за новым интерфейсом.'
      ),
      bullets: [
        L('"use server" replaces the implementation with an encrypted reference in the client bundle.', '"use server" заменяет реализацию зашифрованной ссылкой в клиентском бандле.'),
        L('An action is a POST request and is reachable by anyone who knows the reference.', 'Действие — это POST-запрос, доступный тому, кто знает ссылку.'),
        L('An action attached to a form receives the FormData object automatically.', 'Действие на форме автоматически получает объект FormData.'),
        L('bind can pass extra arguments that are not form fields.', 'bind позволяет передать дополнительные аргументы, которых нет среди полей формы.'),
        L('The response carries the return value and a re-rendered RSC payload.', 'Ответ несёт возвращённое значение и перерендеренную RSC-полезную нагрузку.'),
      ],
      code: `// app/posts/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function createPost(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');

  await db.post.create({
    data: {
      title: String(formData.get('title')),
      authorId: session.user.id,
    },
  });

  revalidatePath('/posts');
}`,
      table: {
        caption: L('Server action against route handler', 'Серверное действие против обработчика маршрута'),
        headers: [
          L('Aspect', 'Аспект'),
          L('Server action', 'Серверное действие'),
          L('Route handler', 'Обработчик маршрута'),
        ],
        rows: [
          [
            L('Called from', 'Вызывается из'),
            L('A form or an event handler', 'Формы или обработчика события'),
            L('An HTTP client', 'HTTP-клиента'),
          ],
          [
            L('Method', 'Метод'),
            L('POST', 'POST'),
            L('Any', 'Любой'),
          ],
          [
            L('Returns', 'Возвращает'),
            L('A value serialized to the client', 'Значение, сериализованное в клиент'),
            L('A full HTTP response', 'Полный HTTP-ответ'),
          ],
          [
            L('Triggers a re-render', 'Запускает перерисовку'),
            L('Yes, when it invalidates', 'Да, если сбрасывает кэш'),
            L('No', 'Нет'),
          ],
          [
            L('Best for', 'Лучше всего подходит для'),
            L('Mutations from the UI', 'Мутаций из интерфейса'),
            L('Webhooks and public APIs', 'Вебхуков и публичных API'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('An action is a public endpoint', 'Действие — это публичный эндпоинт'),
          text: L(
            'The fact that the UI hides the button changes nothing: the action reference is in the page, and the endpoint accepts it from anywhere. Every action repeats the authorisation check, exactly like a route handler does.',
            'То, что интерфейс прячет кнопку, ничего не меняет: ссылка на действие есть в странице, а эндпоинт принимает её откуда угодно. Каждое действие повторяет проверку прав, ровно как обработчик маршрута.'
          ),
        },
        {
          tone: 'note',
          title: L('Unused actions are stripped', 'Неиспользуемые действия вырезаются'),
          text: L(
            'Action identifiers are encrypted at build time and functions that nothing references do not reach the client bundle. That removes whole classes of dead endpoints, but it also means the reference a client holds stops working after a redeploy with new identifiers.',
            'Идентификаторы действий шифруются при сборке, а функции, на которые никто не ссылается, в клиентский бандл не попадают. Это убирает целый класс мёртвых эндпоинтов, но означает и другое: ссылка, которую держит клиент, перестаёт работать после деплоя с новыми идентификаторами.'
          ),
        },
      ],
      takeaway: L(
        'A server action is a POST endpoint with a friendly name, so it needs the same defences as any endpoint.',
        'Серверное действие — это POST-эндпоинт с удобным именем, и ему нужны те же защиты, что любому эндпоинту.'
      ),
      seeAlso: [
        L('Section 4-2: validation and authorisation', 'Секция 4-2: валидация и авторизация'),
        L('Section 4-3: useActionState and form state', 'Секция 4-3: useActionState и состояние формы'),
        L('Section 1-5: route handlers versus pages', 'Секция 1-5: обработчики маршрута против страниц'),
      ],
    },
    {
      id: 'next-ch4-s2',
      title: L('Validation and authorisation', 'Валидация и авторизация'),
      body: L(
        'The framework protects an action at the transport level: it compares the Origin header with the Host to block cross-site submissions, it caps the request body, and it encrypts the action identifiers. None of that decides whether the caller may perform the operation. Every action must authenticate the caller and authorise the operation itself, because a request can arrive without ever passing through the UI.\n\nAuthentication asks who the caller is and the answer comes from the session, never from the request body. Authorisation asks whether that caller may act on this particular record, and it usually needs a lookup: the action should take an identifier and a change, then re-read the record and verify ownership before writing. Schema validation checks the shape of the input, not the ownership of the row, and a well-formed object can still point at somebody else data.\n\nThe second half of the rule is about what comes back. The return value of an action is serialized to the client, so it must contain only what the interface needs. Returning a whole database record leaks columns that the UI never shows and that the schema validation was never applied to. Shape the return value explicitly and treat it as part of the public surface of the action.\n\nThere is a fourth habit that pays off: the action should not trust the client for anything the server can derive. The current user comes from the session, the price comes from the database, the permissions come from the server-side policy. Every value the client could have modified but that the server could have computed is a value that will be modified.',
        'Фреймворк защищает действие на транспортном уровне: сравнивает заголовок Origin с Host, блокируя подделки с другого сайта, ограничивает размер тела запроса и шифрует идентификаторы действий. Ничто из этого не решает, может ли вызывающий выполнить операцию. Каждое действие обязано само аутентифицировать вызывающего и авторизовать операцию, потому что запрос может прийти вообще без участия интерфейса.\n\nАутентификация отвечает на вопрос кто вы, и ответ берётся из сессии, а не из тела запроса. Авторизация отвечает на вопрос можно ли этому человеку действовать с этой записью, и обычно требует обращения к данным: действие должно принимать идентификатор и изменение, перечитывать запись и проверять владение перед записью. Валидация схемы проверяет форму входа, а не принадлежность строки, и корректно сформированный объект всё равно может указывать на чужие данные.\n\nВторая половина правила касается того, что возвращается. Возвращаемое значение действия сериализуется в клиент, поэтому содержать оно должно только то, что нужно интерфейсу. Возврат всей записи из базы выдаёт колонки, которых интерфейс никогда не показывает и к которым схема никогда не применялась. Формируйте возвращаемое значение явно и относитесь к нему как к публичной части действия.\n\nЕсть ещё одна привычка, которая окупается: действие не должно доверять клиенту ни в чём, что сервер может вычислить сам. Текущий пользователь берётся из сессии, цена — из базы, права — из серверной политики. Любое значение, которое клиент мог изменить, но которое сервер способен посчитать, будет изменено.'
      ),
      bullets: [
        L('Framework protections cover transport, not permissions.', 'Защита фреймворка покрывает транспорт, а не права.'),
        L('Authenticate from the session, never from the form data.', 'Аутентифицируйте по сессии, а не по данным формы.'),
        L('Authorise by ownership: look the record up and check it.', 'Авторизуйте по владению: найдите запись и проверьте её.'),
        L('Schema validation checks the shape, not the rights.', 'Валидация схемы проверяет форму, а не права.'),
        L('The return value is sent to the client, so return only what the UI needs.', 'Возвращаемое значение уходит в клиент, поэтому отдавайте только нужное интерфейсу.'),
      ],
      code: `// app/items/actions.ts
'use server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
const schema = z.object({ itemId: z.string().min(1) });

export async function completeItem(input: unknown) {
  const session = await auth();
  if (!session?.user) return { error: 'Unauthorized' };

  const parsed = schema.safeParse(input);
  if (!parsed.success) return { error: 'Invalid input' };

  const item = await db.item.findFirst({
    where: { id: parsed.data.itemId, ownerId: session.user.id },
  });
  if (!item) return { error: 'Not found' };

  await db.item.update({ where: { id: item.id }, data: { completed: true } });
  return { ok: true };
}`,
      table: {
        caption: L('What each check protects against', 'От чего защищает каждая проверка'),
        headers: [
          L('Check', 'Проверка'),
          L('Catches', 'Ловит'),
          L('Does not catch', 'Не ловит'),
        ],
        rows: [
          [
            L('Origin check by the framework', 'Проверка Origin в фреймворке'),
            L('Cross-site submissions', 'Подделки с другого сайта'),
            L('A valid user calling the wrong action', 'Действие не из того места, но от того же пользователя'),
          ],
          [
            L('Session check', 'Проверка сессии'),
            L('An anonymous caller', 'Анонимного вызывающего'),
            L('A user acting on a foreign record', 'Пользователя, трогающего чужую запись'),
          ],
          [
            L('Schema validation', 'Валидация схемы'),
            L('Malformed input', 'Некорректный вход'),
            L('A well-formed request for forbidden data', 'Корректный запрос к запрещённым данным'),
          ],
          [
            L('Ownership lookup', 'Проверка владения'),
            L('Acting on a foreign record', 'Действие с чужой записью'),
            L('A legitimate action that should be audited', 'Легитимное действие, которое стоит записать в журнал'),
          ],
          [
            L('Shaped return value', 'Сформированный результат'),
            L('Accidental data leaks', 'Случайные утечки данных'),
            L('A deliberate leak in the action itself', 'Намеренную утечку в самом действии'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('Trusting the client for values the server can compute', 'Доверие клиенту в том, что сервер считает сам'),
          text: L(
            'An action that accepts the whole record and marks it complete can mark any record complete, because the identifier and the ownership both arrive from the client. Send a reference and a change, and derive everything else from the session.',
            'Действие, которое принимает всю запись и отмечает её выполненной, может отметить выполненной любую запись, потому что и идентификатор, и принадлежность приходят от клиента. Отправляйте ссылку и изменение, а всё остальное берите из сессии.'
          ),
        },
        {
          tone: 'warning',
          title: L('Render-time gating is not a security boundary', 'Проверка при рендере не является границей безопасности'),
          text: L(
            'Rendering the form only for signed-in users does not protect the action, because the request can be sent without the form. The check belongs in the action, and the same rule applies to route handlers.',
            'Рендер формы только для вошедших пользователей не защищает действие, потому что запрос можно отправить и без формы. Проверка должна быть внутри действия, и то же правило относится к обработчикам маршрута.'
          ),
        },
      ],
      takeaway: L(
        'Every action authenticates, authorises by ownership and returns only what the UI needs.',
        'Каждое действие проверяет личность, права по владению и возвращает только то, что нужно интерфейсу.'
      ),
      seeAlso: [
        L('Section 4-1: what a server action is', 'Секция 4-1: что такое серверное действие'),
        L('Section 5-4: authentication at the edge', 'Секция 5-4: аутентификация на краю'),
        L('Section 1-5: route handlers versus pages', 'Секция 1-5: обработчики маршрута против страниц'),
      ],
    },
    {
      id: 'next-ch4-s3',
      title: L('useActionState and form state', 'useActionState и состояние формы'),
      body: L(
        'A form that posts to a server action has to show three things: the result of the last submission, the fact that a submission is in flight, and the validation errors. `useActionState` from React gives all three. It takes the action and an initial state, and returns a tuple of the current state, a wrapped action to put on the form, and a pending flag.\n\nThe wrapper changes the signature of the action: it now receives the previous state as its first argument and the FormData as the second. That is how the action reports errors. Instead of throwing, it returns an object describing what happened, and the component renders that object.\n\nThe pending flag from `useActionState` covers the whole form. For finer control, `useFormStatus` from `react-dom` reports the status of the nearest enclosing form and has to be called from a component rendered inside that form. It returns a `pending` boolean, so the standard pattern is a separate submit button component that disables itself while the request is running.\n\nErrors deserve a decision. An action that throws produces an error at the nearest error boundary, which replaces the segment with an error view; the `digest` property on the error gives a key that matches the server log, so the user can quote it. An action that returns a validation error keeps the user on the form with the message next to the field. Validation problems are expected input, not exceptional conditions, so they belong in the returned state, and only genuine failures belong in the throw.',
        'Форма, отправляющая данные в серверное действие, должна показывать три вещи: результат последней отправки, факт, что отправка в полёте, и ошибки валидации. `useActionState` из React даёт все три. Он принимает действие и начальное состояние, а возвращает тройку из текущего состояния, обёрнутого действия для формы и флага ожидания.\n\nОбёртка меняет сигнатуру действия: теперь оно получает предыдущее состояние первым аргументом, а FormData вторым. Так действие сообщает об ошибках. Вместо выброса исключения оно возвращает объект с описанием того, что произошло, а компонент рисует этот объект.\n\nФлаг ожидания из `useActionState` покрывает всю форму. Для более тонкого контроля `useFormStatus` из `react-dom` сообщает состояние ближайшей объемлющей формы, и его надо вызывать из компонента, отрисованного внутри этой формы. Он возвращает булево `pending`, поэтому обычный приём — отдельный компонент кнопки, который отключает себя на время запроса.\n\nОшибкам стоит посвятить решение. Действие, бросившее исключение, порождает ошибку в ближайшей границе ошибок, и сегмент заменяется экраном ошибки; свойство `digest` у ошибки даёт ключ, совпадающий с записью в серверном журнале, и пользователь может его назвать. Действие, вернувшее ошибку валидации, оставляет пользователя на форме с сообщением рядом с полем. Ошибки валидации — это ожидаемый вход, а не исключительная ситуация, поэтому им место в возвращаемом состоянии, и только настоящие сбои имеют право быть исключением.'
      ),
      bullets: [
        L('useActionState returns the state, the bound action and a pending flag.', 'useActionState возвращает состояние, обёрнутое действие и флаг ожидания.'),
        L('The action receives the previous state as its first argument.', 'Действие получает предыдущее состояние первым аргументом.'),
        L('useFormStatus must be called from inside the form it describes.', 'useFormStatus надо вызывать изнутри описываемой формы.'),
        L('Return validation errors, throw only for genuine failures.', 'Ошибки валидации возвращайте, бросайте только при настоящих сбоях.'),
        L('The pending flag is what disables the submit button.', 'Флаг ожидания и есть то, что отключает кнопку отправки.'),
      ],
      code: `// app/actions.ts
'use server';
export async function createUser(prev: { error?: string }, formData: FormData) {
  const email = String(formData.get('email'));
  if (!email.includes('@')) return { error: 'Enter a valid email' };
  await db.user.create({ data: { email } });
  return { error: undefined };
}
// app/signup.tsx
'use client';
import { useActionState } from 'react';
import { createUser } from './actions';
export function Signup() {
  const [state, formAction, pending] = useActionState(createUser, {});
  return (
    <form action={formAction}>
      <input name="email" type="email" required />
      {state.error && <p role="alert">{state.error}</p>}
      <button disabled={pending}>Sign up</button>
    </form>
  );
}`,
      table: {
        caption: L('Three ways to react to a submission', 'Три способа отреагировать на отправку'),
        headers: [
          L('Signal', 'Сигнал'),
          L('Source', 'Источник'),
          L('Use for', 'Для чего'),
        ],
        rows: [
          [
            L('state', 'state'),
            L('useActionState', 'useActionState'),
            L('Validation errors and results', 'Ошибки валидации и результаты'),
          ],
          [
            L('pending', 'pending'),
            L('useActionState', 'useActionState'),
            L('Disabling the whole form', 'Отключение всей формы'),
          ],
          [
            L('pending', 'pending'),
            L('useFormStatus', 'useFormStatus'),
            L('A submit button inside the form', 'Кнопка отправки внутри формы'),
          ],
          [
            L('digest', 'digest'),
            L('The error boundary', 'Граница ошибок'),
            L('Matching the server log entry', 'Сопоставление с записью в журнале'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('useFormStatus called outside the form', 'useFormStatus вызван вне формы'),
          text: L(
            'The hook reads the context of the nearest enclosing form. A button component rendered as a sibling of the form sees no form at all and always reports pending as false, so the button never disables.',
            'Хук читает контекст ближайшей объемлющей формы. Компонент кнопки, отрисованный соседом формы, не видит никакой формы и всегда сообщает pending как false, поэтому кнопка никогда не отключается.'
          ),
        },
        {
          tone: 'note',
          title: L('Return errors, do not throw them', 'Ошибки возвращайте, а не бросайте'),
          text: L(
            'A thrown error replaces the segment with an error view, which is the right outcome for a broken database and the wrong one for a mistyped email. Expected input belongs in the state.',
            'Выброшенное исключение заменяет сегмент экраном ошибки — правильный исход для сломанной базы и неправильный для опечатки в адресе. Ожидаемый вход принадлежит состоянию.'
          ),
        },
      ],
      takeaway: L(
        'Validation errors are state, not exceptions: return them and render them next to the field.',
        'Ошибки валидации — это состояние, а не исключение: возвращайте их и показывайте рядом с полем.'
      ),
      seeAlso: [
        L('Section 4-2: validation and authorisation', 'Секция 4-2: валидация и авторизация'),
        L('Section 4-5: progressive enhancement and errors', 'Секция 4-5: прогрессивное улучшение и ошибки'),
        L('Section 1-4: loading, error and not-found boundaries', 'Секция 1-4: границы загрузки, ошибок и 404'),
      ],
    },
    {
      id: 'next-ch4-s4',
      title: L('Revalidation after a mutation', 'Ревалидация после мутации'),
      body: L(
        'A write makes cached data wrong. The write path has to say which caches are affected, and the framework gives four tools for it, each with different timing. `updateTag` expires a tagged entry immediately, `revalidateTag` with a profile marks it stale and refreshes it in the background, `revalidatePath` invalidates a route path, and `refresh` refetches the current route payload without touching the cache at all.\n\nThe choice is really a choice between latency and consistency. If the person who just clicked the button must see their own change, use `updateTag`: the next read waits for fresh data. If the data is content that changes rarely and a short delay is fine, use `revalidateTag` with a profile: readers keep getting the old copy while the new one is fetched in the background.\n\nThe re-render travels in the same response. When an action calls `updateTag`, `revalidatePath` or `refresh`, the framework re-renders the current route on the server and ships the new RSC payload back in the action response, so the client commits it without a second request. `revalidateTag` with a stale-while-revalidate profile is the deliberate exception: it does not include that re-render, and the page reflects the change on a later read.\n\nOrder matters. `redirect` throws a control-flow exception, so any code after it never runs; put the invalidation calls before the redirect, or the destination renders from data that is still cached. And the invalidation must come after the write has committed, because a tag that expires before the data changes simply gets repopulated with the old value.',
        'Запись делает кэшированные данные неверными. Путь записи должен сказать, какие кэши затронуты, и фреймворк даёт для этого четыре инструмента с разным таймингом. `updateTag` немедленно истекает запись по тегу, `revalidateTag` с профилем помечает её устаревшей и обновляет в фоне, `revalidatePath` сбрасывает путь маршрута, а `refresh` перезапрашивает полезную нагрузку текущего маршрута, не трогая кэш вовсе.\n\nВыбор — это на самом деле выбор между задержкой и согласованностью. Если человек, только что нажавший кнопку, должен увидеть своё изменение, нужен `updateTag`: следующее чтение ждёт свежих данных. Если данные меняются редко и небольшая задержка допустима, нужен `revalidateTag` с профилем: читатели продолжают получать старую копию, пока свежая грузится в фоне.\n\nПерерисовка едет в том же ответе. Когда действие вызывает `updateTag`, `revalidatePath` или `refresh`, фреймворк перерендеривает текущий маршрут на сервере и отправляет новую RSC-полезную нагрузку в ответе на действие, и клиент применяет её без второго запроса. `revalidateTag` с профилем stale-while-revalidate — осознанное исключение: он не включает эту перерисовку, и страница отражает изменение при следующем чтении.\n\nПорядок имеет значение. `redirect` бросает исключение управления потоком, поэтому код после него не выполняется; вызовы инвалидации надо ставить перед редиректом, иначе страница назначения отрисуется из всё ещё кэшированных данных. И инвалидация должна идти после фиксации записи, потому что тег, истёкший до изменения данных, просто наполняется старым значением.'
      ),
      bullets: [
        L('updateTag expires immediately, revalidateTag serves stale and refreshes in the background.', 'updateTag истекает немедленно, revalidateTag раздаёт устаревшее и обновляет в фоне.'),
        L('revalidatePath invalidates a path, refresh refetches the payload without touching the cache.', 'revalidatePath сбрасывает путь, refresh перезапрашивает полезную нагрузку, не трогая кэш.'),
        L('updateTag, revalidatePath and refresh ship a re-rendered RSC payload in the same response.', 'updateTag, revalidatePath и refresh отправляют перерендеренную RSC-полезную нагрузку в том же ответе.'),
        L('revalidateTag with a profile does not re-render immediately.', 'revalidateTag с профилем не перерисовывает немедленно.'),
        L('Invalidate after the write and before the redirect.', 'Сбрасывайте кэш после записи и до редиректа.'),
      ],
      code: `// app/posts/actions.ts
'use server';

import { redirect } from 'next/navigation';
import { revalidatePath, updateTag } from 'next/cache';

export async function publishPost(id: string) {
  await db.post.update({ where: { id }, data: { status: 'published' } });

  updateTag('posts'); // read-your-own-writes
  revalidatePath('/posts');

  redirect('/posts'); // must come last, redirect throws
}`,
      table: {
        caption: L('Choosing between the cache update calls', 'Выбор между вызовами обновления кэша'),
        headers: [
          L('Call', 'Вызов'),
          L('Timing', 'Тайминг'),
          L('Re-render in the response', 'Перерисовка в ответе'),
        ],
        rows: [
          [
            L('updateTag', 'updateTag'),
            L('Immediate', 'Немедленно'),
            L('Yes', 'Да'),
          ],
          [
            L('revalidateTag', 'revalidateTag'),
            L('Stale while refreshing', 'Устаревшее при обновлении'),
            L('No', 'Нет'),
          ],
          [
            L('revalidatePath', 'revalidatePath'),
            L('Immediate', 'Немедленно'),
            L('Yes', 'Да'),
          ],
          [
            L('refresh', 'refresh'),
            L('On the next read', 'При следующем чтении'),
            L('Yes', 'Да'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('The redirect before the invalidation', 'Редирект раньше инвалидации'),
          text: L(
            'redirect throws, so the code after it never runs. When the invalidation is placed after the redirect, the destination page is rendered from the cached data and looks unchanged, and the developer blames the cache instead of the order of the calls.',
            'redirect бросает исключение, поэтому код после него не выполняется. Если инвалидация стоит после редиректа, страница назначения рисуется из кэшированных данных и выглядит неизменившейся, и разработчик винит кэш вместо порядка вызовов.'
          ),
        },
        {
          tone: 'warning',
          title: L('Invalidating before the write commits', 'Сброс до фиксации записи'),
          text: L(
            'The entry is expired and immediately refilled with the value that was there before the write, so the invalidation is silently lost. Write, wait for the commit, then invalidate.',
            'Запись истекает и тут же наполняется значением, которое было до записи, и инвалидация молча теряется. Сначала запись, затем ожидание фиксации, и только потом сброс.'
          ),
        },
      ],
      takeaway: L(
        'Invalidate after the write, before the redirect, and choose immediate expiry when the writer must see the result.',
        'Сбрасывайте кэш после записи и до редиректа, а немедленное истечение выбирайте там, где автор должен увидеть результат.'
      ),
      seeAlso: [
        L('Section 3-5: tags and on-demand revalidation', 'Секция 3-5: теги и инвалидация по требованию'),
        L('Section 4-1: what a server action is', 'Секция 4-1: что такое серверное действие'),
        L('Section 3-3: the data cache and revalidation', 'Секция 3-3: кэш данных и ревалидация'),
      ],
    },
    {
      id: 'next-ch4-s5',
      title: L('Progressive enhancement and errors', 'Прогрессивное улучшение и ошибки'),
      body: L(
        'A form whose action is a server action still works without JavaScript. React renders the form with a real action attribute pointing at the framework action endpoint, so the browser performs a normal form submission, the server runs the action and the response replaces the page. The difference is that with JavaScript the update is applied without a full document load, and without it the visitor gets a slower but correct result.\n\nThat property is not free, and it constrains the code. The action must be reachable from a form element, the data must travel as form fields, and the result must be renderable by the server. An action that expects a JSON body, or one that is called from a click handler on a `div`, works only with JavaScript and loses the fallback.\n\nErrors have two destinations. An error thrown inside the action propagates to the nearest error boundary, which replaces the segment with an error view; the `digest` property on the error gives a key that matches the server log, so the visitor can quote it. An error returned as state stays on the form and is rendered as a message. The first is for the unexpected, the second for the expected.\n\nThe client dispatches actions one at a time. If a visitor triggers three actions in quick succession, the second waits for the first to finish, so the re-rendered tree always matches the result that produced it. The practical consequence is that `Promise.all` over several actions does not parallelise them, and code that assumes it does will observe the actions executing in sequence.',
        'Форма, чьё действие является серверным, работает и без JavaScript. React рисует форму с настоящим атрибутом action, указывающим на эндпоинт действий фреймворка, браузер выполняет обычную отправку формы, сервер запускает действие, а ответ заменяет страницу. Разница в том, что с JavaScript обновление применяется без полной загрузки документа, а без него посетитель получает более медленный, но корректный результат.\n\nЭто свойство не бесплатно, и оно ограничивает код. Действие должно быть достижимо из элемента формы, данные должны передаваться полями формы, а результат должен уметь отрисовать сервер. Действие, ожидающее JSON-тело, или действие, вызываемое из обработчика клика на `div`, работает только с JavaScript и теряет запасной путь.\n\nУ ошибок два адресата. Ошибка, брошенная внутри действия, поднимается до ближайшей границы ошибок, и сегмент заменяется экраном ошибки; свойство `digest` даёт ключ, совпадающий с записью в серверном журнале, и посетитель может его назвать. Ошибка, возвращённая как состояние, остаётся на форме и рисуется как сообщение. Первое — для непредвиденного, второе — для ожидаемого.\n\nКлиент отправляет действия по одному. Если посетитель запускает три действия подряд, второе ждёт окончания первого, и перерендеренное дерево всегда соответствует породившему его результату. Практическое следствие: `Promise.all` по нескольким действиям не распараллеливает их, и код, который рассчитывает на обратное, увидит последовательное выполнение.'
      ),
      bullets: [
        L('A form with a server action works without JavaScript.', 'Форма с серверным действием работает и без JavaScript.'),
        L('The action must be reachable from a form element and travel as form fields.', 'Действие должно быть достижимо из элемента формы и передаваться полями формы.'),
        L('A thrown error reaches the nearest error boundary, a returned error stays on the form.', 'Выброшенная ошибка доходит до ближайшей границы ошибок, возвращённая остаётся на форме.'),
        L('The error digest matches the server log entry.', 'Ключ digest совпадает с записью в серверном журнале.'),
        L('Actions are dispatched sequentially, so Promise.all does not parallelise them.', 'Действия отправляются последовательно, и Promise.all их не распараллеливает.'),
      ],
      code: `// app/comments/form.tsx  - a server component, no client code
import { addComment } from './actions';

export function CommentForm({ postId }: { postId: string }) {
  return (
    <form action={addComment}>
      <input type="hidden" name="postId" value={postId} />
      <textarea name="body" required />
      <button type="submit">Post comment</button>
    </form>
  );
}

// app/comments/actions.ts
'use server';

export async function addComment(formData: FormData) {
  const body = String(formData.get('body'));
  await db.comment.create({ data: { body, postId: String(formData.get('postId')) } });
}`,
      table: {
        caption: L('Where an error surfaces', 'Где всплывает ошибка'),
        headers: [
          L('Outcome', 'Исход'),
          L('Destination', 'Место'),
          L('Visitor sees', 'Посетитель видит'),
        ],
        rows: [
          [
            L('Validation failure', 'Ошибка валидации'),
            L('Returned state', 'Возвращённое состояние'),
            L('A message next to the field', 'Сообщение рядом с полем'),
          ],
          [
            L('Thrown error', 'Выброшенная ошибка'),
            L('Error boundary', 'Граница ошибок'),
            L('The error view', 'Экран ошибки'),
          ],
          [
            L('Missing record', 'Отсутствующая запись'),
            L('notFound()', 'notFound()'),
            L('The 404 view', 'Экран 404'),
          ],
          [
            L('Network loss during submit', 'Потеря сети при отправке'),
            L('The form stays pending', 'Форма остаётся в ожидании'),
            L('A disabled button', 'Отключённая кнопка'),
          ],
        ],
      },
      callouts: [
        {
          tone: 'pitfall',
          title: L('An action that only works with JavaScript', 'Действие, работающее только с JavaScript'),
          text: L(
            'An action invoked from a click handler on a div, or one that reads a JSON body, silently removes the no-JavaScript path. Nothing warns you about it, and the first visitor with a slow device or a blocked script is the one who finds out.',
            'Действие, вызванное из обработчика клика на div, или читающее JSON-тело, молча убирает путь без JavaScript. Никто об этом не предупредит, и узнает об этом первый посетитель с медленным устройством или с заблокированными скриптами.'
          ),
        },
        {
          tone: 'tip',
          title: L('Log the digest, quote it in the error view', 'Логируйте digest и показывайте его на экране ошибки'),
          text: L(
            'The digest is the link between what the visitor sees and what the server recorded. Showing it turns a support conversation into a single lookup in the log.',
            'Ключ digest связывает то, что видит посетитель, с тем, что записал сервер. Если показать его, обращение в поддержку превращается в один поиск по журналу.'
          ),
        },
      ],
      takeaway: L(
        'Keep actions reachable from a plain form so the no-JavaScript path stays correct.',
        'Держите действия доступными из обычной формы, чтобы путь без JavaScript оставался рабочим.'
      ),
      seeAlso: [
        L('Section 4-3: useActionState and form state', 'Секция 4-3: useActionState и состояние формы'),
        L('Section 1-4: loading, error and not-found boundaries', 'Секция 1-4: границы загрузки, ошибок и 404'),
        L('Section 2-5: composition patterns across the boundary', 'Секция 2-5: композиция через границу'),
      ],
    },
  ],
};
