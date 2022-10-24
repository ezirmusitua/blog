---
title: "vim-zettel 文档中文翻译"
date: "2022/10/07"
excerpt: "zettelkasten 是一种旨在通过文件的链接建立知识的链接的笔记方法。目前已经有许多基于该方法实现的应用，比如 Obsidian、Logseq 之类的。如果你的主力编辑器是 vim，可以试试使用 vim-zettel 实践 zettelkasten 方法。本文是对 vim-zettel 文档的粗浅翻译，如有疏漏可以通过邮件（jferroal@gmail.com）联系我。"
keywords: "zettelkasten,zettel,Obsdian,Logseq,vim,vim-zettel,vim-wiki,fzf,中文翻译,笔记,笔记方法"
cover_image: "https://images.unsplash.com/photo-1527345931282-806d3b11967f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
draft: "false"
---

zettelkasten 是一种旨在通过文件的链接建立知识的链接的笔记方法。目前已经有许多基于该方法实现的应用，比如 Obsidian、Logseq 之类的。如果你的主力编辑器是 vim，可以试试使用 vim-zettel 实践 zettelkasten 方法。本文是对 vim-zettel 文档的粗浅翻译，如有疏漏可以通过邮件（jferroal@gmail.com）联系我。

vim-zettel 的 repo 请点击[这里](https://github.com/michal-h21/vim-zettel)，英文原文请在 vim 中使用 `:help vim-zettel` 查看。

## 介绍（Intro）

这是一个实现了 https://zettelkasten.de/ 中描述的 zettelkasten 笔记法的 Vim 插件。是 Vimwiki 的扩展插件，支持 Vimwiki 和 Markdown 语法。

主要功能：

- 可自定义的文件名（日期和时间、标题、连续编号、随机字符） - 无论实际文件名如何，链接始终显示标题 - 使用 fzf 进行全文搜索和超链接支持 - 从 LaTeX 或 Markdown 文档中搜索 Zettelkasten 并将选定的注释插入到文档 - 模板支持 - 自动更新标签索引 - 反向链接

## 安装（Installation）

默认使用 [Silver Searcher](https://github.com/ggreer/the_silver_searcher/) 作为搜索工具。

Using Vundle:

```plaintext
Plugin 'vimwiki/vimwiki'
Plugin 'junegunn/fzf'
Plugin 'junegunn/fzf.vim'
Plugin 'michal-h21/vim-zettel'
```

## 配置（Configuration）

因为 Vim-Zettel 是基于 Vimwiki 工作的，所以先配置 Vimwiki。如果您只有一个 wiki，则可以直接使用 Vim-Zettel，无需进一步配置。但是，如果你想要自定义 Vim-Zettel 配置或有多个 wiki，则必须进行如下的配置。

```lisp
" Settings for Vimwiki
let g:vimwiki_list = [\
  {'path':'~/scratchbox/vimwiki/markdown/','ext':'.md',\ 'syntax':'markdown'}, \
  {"path":"~/scratchbox/vimwiki/wiki/"} \
]
```

你可以在 .vimrc 文件中配置以下选项以使 Vim-Zettel 符合你的喜好：

- `g:zettel_options`
- `g:zettel_format`
- `g:zettel_default_mappings`
- `g:zettel_fzf_command`
- `g:zettel_fzf_options`
- `g:zettel_backlinks_title`
- `g:zettel_backlinks_title_level`
- `g:zettel_unlinked_notes_title`
- `g:zettel_unlinked_notes_title_level`
- `g:zettel_generated_tags_title`
- `g:zettel_generated_tags_title_level`

你还可以提供用于创建新 zettels 的自定义模板。参见[模板](#模版（模板）)。

## 命令（Commands）

安装 Vim-Zettel 后，使用 `:VimwikiIndex` 命令打开 wiki 的主文件。从此页面链接到你的笔记。

Vim-Zettel 在 Vimwiki 之上实现了以下命令。

- `:ZettelNew` 命令——它将创建一个名为 %y%m%d-%H%M.wiki 的新 wiki 文件（可以使用 `g:zettel_format` 变量更改文件名格式）。该文件使用如下模板

```plaintext
%title Note title
%date current date
```

其中 title 是 `:ZettelNew` 的第一个参数。

如果您使用 `Vim-Zettel` 提供的默认映射，可以通过在可视模式下按 `z` 字符来调用此命令。所选文本将用作新笔记的标题。

新创建的 wiki 文件将按照给定的顺序保存在：

(1) 如果当前目录在 `g:vimwiki_list` 中，则保存在当前目录

(2) 具有非空 `g:zettel_options` 的第一个 `g:vimwiki_list` 的目录路径

(3) 第一个 `g:vimwiki_list` 条目给出的目录路径

(4) vimwiki 的默认目录

with the given order.

- `:ZettelOpen` 命令 - 使用 fzf 执行全文搜索。它保留打开页面的历史记录。
- `:ZettelInsertNote` - 使用 fzf 选择笔记并将它们插入当前文档。可以使用 `<TAB>`键选择多个笔记。它们会使用 Pandoc 自动转换为文档语法格式。
- `:ZettelCapture` 命令 - 将当前文件的内容转换为 zettel。这是一个在 Vim 中可用的全局命令。警告：此命令具有破坏性。仅用于临时文件。您可以在查看要转换为 zettel 的文件时从 vim 中运行它，或者从命令行运行它：

```bash
vim -c ZettelCapture filename
```

如果有多个 wiki，可以指定 wiki 编号（从 0 开始）。默认打开第一个声明的 wiki：

```bash
vim -c "ZettelCapture 1" filename
```

- `:ZettelSetActiveWiki` 命令 - 为在 Vimwiki 不活动时可以运行的命令选择默认 wiki，例如 `:ZettelOpen` 或 `:ZettelInsertNote`。
- `:ZettelBackLinks` 命令 - 插入链接到当前笔记的笔记列表。
- `:ZettelInbox` 命令 - 插入无法从索引文件访问的笔记列表（您可以使用 `:VimwikiIndex` 命令打开索引文件）。
- `:ZettelGenerateLinks` 命令 - 在当前页面中插入所有 wiki 页面的列表。需要更新的标签数据库（ `:VimwikiRebuildTags!`）。
- `:ZettelGenerateTags` 命令 - 在当前页面中插入标签列表和使用这些标签的页面。需要更新的标签数据库（ `:VimwikiRebuildTags!`）。只支持 :tag1:tag2 形式的 Vimwiki 样式标签（在 Markdown 模式下也能工作）。
- `:ZettelSearch` 命令- 搜索你的 zettelkasten 的内容并在当前的笔记中插入一个指向所选 zettel 的链接。在插入模式下映射到 `[[`。
- `:ZettelSelectBuffer` 命令 - 从最近打开的笔记列表中选择。
- `:ZettelTitleSelected` 命令 - 使用 fzf 选择笔记并使用实际选择的文本作为标题。
- `:ZettelYankName` 命令 - 将当前 zettel 的格式化链接复制到寄存器。在正常模式下映射到 `T`。

有用的 Vimwiki 命令 ~

- `:VimwikiBacklinks` 命令 - 显示链接到当前页面的文件
- `:VimwikiCheckLinks` 命令 - 显示没有其他文件链接的文件

## 键盘映射（Mappings）

`Vim-zettel` 默认设置了一些映射。你可以禁用默认映射并定义自己的映射。更多细节见 `g:zettel_default_mappings` 。

- 可视模式下的"z" 命令 - 使用选定的文本作为笔记标题创建一个新的 wiki 文件。
- 插入模式下的"[[" 命令 - 使用 fzf 进行笔记搜索，并创建一个笔记的链接。
- 可视模式下的"g[" 命令 - 以选定的文本作为标题，创建一个到笔记的链接。
- 正常模式下的"T" 命令 – 将当前笔记文件名和标题作为 Vimwiki 链接。
- 正常模式下的"gZ" 命令 – 将光标下的文件路径替换为 Wiki 链接。

或者可以通过映射 `ZettelNew` 以提示输入笔记标题：

```lisp
nnoremap <leader>zn :ZettelNew<space>
```

## 变量（Variables）

`g:zettel_options` 变量对应于 g:vimwiki_list 变量。如果有多个 vimwiki，并且 `g:vimwiki_list` 变量中列出的第二个 wiki 是你的 zettelkasten，那么必须将 `g:zettel_options` 列表中的第一个 wiki 表示为一组空括号：

```lisp
let g:zettel_options = [\
  {}, \
  { \
    "front_matter" : [["tags", ""], ["type","note"]], \
    "template" :  "~/mytemplate.tpl" \
  } \
]
```

`front_matter` 包含要插入到新注释标题中的附加字段。这个的值应该是列表的列表，其中第一项包含键，第二项包含值。

第二项可以包含 funcref。配置后每次使用此 `front_matter` 选项时，都会执行该函数。可以用来插入当前的 Zettel ID，例如：

```lisp
function! s:insert_id()
  if exists("g:zettel_current_id")
    return g:zettel_current_id
  else
    return "unnamed"
  endif
endfunction

let g:zettel_options = [{"front_matter" :
  [["tags" , ":hello:"],
  [ "id" , function("s:insert_id")]]
}]
```

你可以通过将 `disable_front_matter` 选项设置为 0 以外的其他值来完全禁用前端显示的问题。

`template` 字段在 [Vim-Zettel-Templates](#模版（Templates）) 中讨论。

默认情况下，Vim-Zettel 以 YYMMDD-HHMM 的形式创建文件名。可以使用 g:zettel_format 变量更改此格式。 `strftime()` 函数支持的任何日期和时间格式。

也可以使用其他格式字符串：

- %title - 插入转义过的标题；
- %raw_title - 插入原始标题；
- %file_no - wiki 文件中的序号；
- %file_alpha - wiki 文件中的序号(字符顺序)；
- %random - 使用随机字符(可以通过`g:zettel_random_chars`进行配置，默认使用 8)。

若要要使用基于当前时间和注释标题的文件名，可以使用以下格式：

```lisp
let g:zettel_format = "%y%m%d-%H%M-%title"
```

对于顺序命名的文件，请使用：

```lisp
let g:zettel_format = "%file_no"
```

如果生成的文件名存在（若使用默认格式且在一分钟内同时创建了两个笔记时），则会在文件名中添加字母后缀（比如 `200622-1114` 和 `200622- 1114a`）。 当您在一分钟内创建两个文件时。

Vim-Zettel 遵循 vimwiki 定义的 `link_space_char` 设置（参见 `:h links_space_char`），这个选项允许你指定用于代替文件名的分隔符。

你可以使用 Vimwiki 变量 `g:vimwiki_markdown_link_ext` 来要求在 Vim-zettel 创建的链接中包含 `.md` 扩展名（例如使用 `z` 或 `T` 键）。

```lisp
   let g:vimwiki_markdown_link_ext = 1
```

如果未提供标题，则用于新 Zettel 文件名中的“%title”格式字符串的文本。

用于新 zettel 前端的日期元数据的日期格式。需要由 `strftime()` 函数支持。

For example:

```lisp
let g:zettel_date_format = "%y/%m/%d"
```

可以通过将 g:zettel_default_mappings 变量设置为 0 来更改 Vim-Zettel 使用的默认映射，然后提供自己的键映射。可以参考一下内容进行配置。

```lisp
let g:zettel_default_mappings = 0
" This is basically the same as the default configuration
augroup filetype_vimwiki
  autocmd!
  autocmd FileType vimwiki imap <silent> [[ [[<esc><Plug>ZettelSearchMap
  autocmd FileType vimwiki nmap T <Plug>ZettelYankNameMap
  autocmd FileType vimwiki xmap z <Plug>ZettelNewSelectedMap
  autocmd FileType vimwiki nmap gZ <Plug>ZettelReplaceFileWithLink
augroup END
```

Vim-Zettel 在搜索文件时默认使用 Silver Searcher(ag)。 g:zettel_fzf_command 可用于覆盖默认设置。

```lisp
" command used for VimwikiSearch
" default value is "ag". To use other command, like ripgrep, pass the
" command line and options:
let g:zettel_fzf_command = "rg --column --line-number --ignore-case --no-heading --color=always "
```

请注意，如果要使用 Ripgrep，则需要一定要添加 `--column` 选项。

用于 `fzf` 命令的选项。

```lisp
let g:zettel_fzf_options = ['--exact', '--tiebreak=end']
```

用作生成的索引部分的文本。

```lisp
let g:zettel_generated_index_title = "Generated Index"
```

生成生成的索引部分时要使用的标题等级。

```lisp
let g:zettel_generated_index_title_level = 1
```

用作反向链接部分的文本。

```lisp
let g:zettel_backlinks_title = "Backlinks"
```

生成反向链接部分时要使用的标题级别。

```lisp
let g:zettel_backlinks_title_level = 1
```

用作未链接注释部分的文本。

```lisp
let g:zettel_unlinked_notes_title = "Unlinked Notes"
```

生成未链接的注释部分时要使用的标题级别。

```lisp
let g:zettel_unlinked_notes_title_level = 1
```

用作生成标签部分的文本。

```lisp
let g:zettel_generated_tags_title = "Generated Tags"
```

生成已生成的标签部分时要使用的标题级别。

```lisp
let g:zettel_generated_tags_title_level = 1
```

用于生成链接的格式。如果你对默认格式不满意，可以更改此变量。

```lisp
let g:zettel_link_format="[%title](%link)"
```

`%random` zettel 名称格式中使用的字符数。

`ZettelSelectBuffer` 中使用的格式。可用的变量是 `%filename` 和 `%title`。注意，对于找不到标题的笔记，将使用文件名作为标题，文件名部分留空。

```lisp
let g:zettel_bufflist_format = "%filename - %title
```

## 模板（Templates）

可以使用模板填充具有基本结构的新笔记。可以使用 g:zettel_options 变量声明模板：

```lisp
let g:zettel_options = [{"template" :  "~/path/to/mytemplate.tpl"}]
```

模板样例：

```lisp
= %title =
Backlink: %backlink
----
%footer
```

以 % 开头部分表示可填充的便利店。支持的变量有：

- %title - 新笔记的标题
- %id - 新笔记的文件名
- %backlink - 到父笔记的反向链接
- %date - 新笔记的日期和时间。格式基于 `g:zettel_date_format` 变量。
- %footer - 来自父笔记页脚的文本。页脚通过水平线 (----) 与正文分开。它可以包含一些笔记共享的信息。例如，关于出版物的注释可以共享该出版物的引用。

其他的还有所有在 `front_matter` 中设置的变量。

## 相关包（Related Packages）

以下软件包也可以配合 Vimwiki 及 Vim-Zettel 一起使用：

- [Notational FZF](https://github.com/alok/notational-fzf-vim) - 带有预览窗口的快速搜索笔记。要在 Zettelkasten 中搜索，请将以下变量设置为 .vimrc 中 Zettelkasten 目录的路径：

```lisp
let g:nv_search_paths = ['/path/to/zettelkasten/dir']
```

- [Vimwiki-sync](https://github.com/michal-h21/vimwiki-sync) - 自动提交 wiki 中的更改并将它们与外部 Git 存储库同步。
